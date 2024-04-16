import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { ReplyTemplateComponent } from '../reply-template/reply-template.component';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RoutingService } from '../services/routing/routing.service';
import { ReplyService } from '../services/reply/reply.service';

@Component({
  selector: 'app-comment-template',
  standalone: true,
  imports: [CommonModule, ReplyTemplateComponent],
  templateUrl: './comment-template.component.html',
  styleUrl: './comment-template.component.scss'
})
export class CommentTemplateComponent implements OnInit {
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public routingService: RoutingService = inject(RoutingService);
  public replyService: ReplyService = inject(ReplyService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  @Input()
  public comment: CommentModel = {
    postId: '',
    commentId: '',
    profilePicture: '',
    username: '',
    comment: '',
    likes: [],
    commentDate: ''
  };

  replies: ReplyModel[] = [];
  leftOverReplies: ReplyModel[] = [];


  ngOnInit() {
    let replies: ReplyModel[] = this.localStorageService.getInformation('replies');
    this.leftOverReplies = this.sortRepliesByDate(replies.filter((reply) => reply.commentId == this.comment.commentId));

    if(this.leftOverReplies.length <= 3) {
      this.replies = this.leftOverReplies;
    }
  }

  populateReplies(comment: CommentModel) {
    let rawComments: CommentModel[] = this.localStorageService.getInformation('comments');
    let rawPostComments: CommentModel[] = rawComments.filter((rawComment) => rawComment.postId == comment.postId);

    rawPostComments.reverse();
    
    let index: number = 0;

    for(let i = 0; i < rawPostComments.length; i++) if(rawPostComments[i].commentId == this.comment.commentId) index = i;
    
    const viewReplies = document.querySelector(`.post-comment-${index} .view-replies`);
    const viewMoreReplies = document.querySelector(`.post-comment-${index} .view-more-replies`); 

    if(viewReplies?.classList.contains('active')) {
      viewReplies!.textContent = ` - View ${this.leftOverReplies.length} Replies - `;
      viewMoreReplies!.textContent = ``;
      this.replies = [];
      viewReplies?.classList.toggle('active');
    } else if (viewReplies!.textContent == ' - Hide Replies - ') {
      viewReplies!.textContent = ` - View ${this.leftOverReplies.length} Replies - `;
      viewMoreReplies!.textContent = ``;
      this.replies = [];
    } else if(!viewReplies?.classList.contains('active') && this.leftOverReplies.length <= 10) {
      viewReplies!.textContent = ' - Hide Replies - ';
      this.replies = this.leftOverReplies;
      viewReplies?.classList.toggle('active');
      viewMoreReplies!.textContent = ``;
    } else if(!viewReplies?.classList.contains('active') && this.leftOverReplies.length > 10) {
      this.replies = this.leftOverReplies.slice(0, 10);
      viewReplies!.textContent = ` - Hide Replies - `;
      viewMoreReplies!.textContent = ` - View ${this.leftOverReplies.length - 10} More - `;
    }
  }
  onPopulateMoreReplies(comment: CommentModel) {
    let rawComments: CommentModel[] = this.localStorageService.getInformation('comments');
    let rawPostComments: CommentModel[] = rawComments.filter((rawComment) => rawComment.postId == comment.postId);

    rawPostComments.reverse();

    let index: number = 0;

    for(let i = 0; i < rawPostComments.length; i++) if(rawPostComments[i].commentId == comment.commentId) index = i;

    const viewReplies = document.querySelector(`.post-comment-${index} .view-replies`);
    const viewMoreReplies = document.querySelector(`.post-comment-${index} .view-more-replies`);

    if(this.leftOverReplies.length - this.replies.length <= 10) {
      this.replies = this.sortRepliesByDate(this.leftOverReplies);
      viewReplies!.textContent = ` - Hide Replies - `;
      viewMoreReplies!.textContent = ``;
    } else {
      this.replies = this.leftOverReplies.slice(0, this.replies.length + 10);
      viewReplies!.textContent = ` - Hide Replies - `;
      viewMoreReplies!.textContent = ` - View ${this.leftOverReplies.length - this.replies.length} More - `;
    }
  }

  onReply(comment: CommentModel) {
    const prompt = document.querySelector(`.prompt`);
    prompt!.textContent = `Replying to ${comment.username}`;

    this.replyService.commentId = comment.commentId;
  }

  //bolds the account usernames that are atted(@)
  boldAttedUsernames(caption: string) {
    const count = caption.split('@').length - 1; 

    if(count == 0) {
      return caption;
    } else {
      let newCaption: string = caption; 
      let usedCaption: string = caption;   
  
      for(let i = 0; i < count; i++) {
        let index: number = usedCaption.indexOf('@');
        
        usedCaption = usedCaption.substring(index);
  
        let finalString: string = '';
  
        if(usedCaption.indexOf(' ') == -1) {
          finalString = usedCaption.substring(0);      
        } else if(usedCaption.substring(1).indexOf('@') != -1 && usedCaption.substring(1).indexOf('@') < usedCaption.indexOf(' ')) {
          finalString = usedCaption.substring(0, usedCaption.substring(1).indexOf('@') + 1);
        } else {
          finalString = usedCaption.substring(0, usedCaption.indexOf(' '));
        }       

        newCaption = newCaption.replace(finalString, `<a href="/account/${finalString.substring(1)}/posts" style="font-weight: 600; cursor: pointer; text-decoration: none; color: #fff">${finalString}</a>`);
  
        usedCaption = usedCaption.substring(1);
      }
      
      const element = document.getElementById(`actual-comment-${this.comment.commentId}`)!;
      element.innerHTML = newCaption;

      return;
    }
  }

  //turns 2009-12-18 into December 18, 2009
  fixCommentDate(commentDate?: string) {    
    if(commentDate == '') {
      return '';
    } else {
      let day = commentDate?.substring(8);
      if (day?.charAt(0) == '0') day = day.substring(1);

      let month = commentDate?.substring(5,7);
      const year = commentDate?.substring(0,4);
    
      switch(month) {
        case '01':
          month = 'January'
          break;
        case '02':
          month = 'February'
          break;
        case '03':
          month = 'March'
          break;
        case '04':
          month = 'April'
          break;
        case '05':
          month = 'May'
          break;
        case '06':
          month = 'June'
          break;
        case '07':
          month = 'July'
          break;
        case '08':
          month = 'August'
          break;
        case '09':
          month = 'September'
          break;
        case '10':
          month = 'October'
          break;
        case '11':
          month = 'November'
          break;
        case '12':
          month = 'December'
          break;
      }
        
      return `${month} ${day}, ${year}`
    }
  }

  onLike() {
    if(this.comment.likes.includes(this.currentUser.username)) {
      const index = this.comment.likes.indexOf(this.currentUser.username, 0);

      if (index > -1) {
        this.comment.likes.splice(index, 1);
      }
    } else {
      this.comment.likes.push(this.currentUser.username);
    }    

    //update the likes for that post in database
    let comments: CommentModel[] = this.localStorageService.getInformation('comments');

    for(let comment of comments) {
      if(comment.commentId == this.comment.commentId) {
        comment.likes = this.comment.likes;
      }
    }

    this.localStorageService.clearInformation('comments');
    this.localStorageService.setInformation('comments', comments);
  }

  //not being used
  sortRepliesByDate(replies: ReplyModel[]) {
    replies.sort((a: ReplyModel, b: ReplyModel) => {
      let aDate: Date = new Date(a.commentDate);
      let bDate: Date = new Date(b.commentDate);
      
      return aDate.getTime() - bDate.getTime();
    });

    return replies;
  }

  attedUserClicked(attedUser: string) {
    this.routingService.navigateToAccountsPosts(attedUser);
  }
}
