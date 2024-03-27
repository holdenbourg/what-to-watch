import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { ReplyTemplateComponent } from '../reply-template/reply-template.component';
import { empty } from 'rxjs';
import { RawCommentModel } from '../services/models/database-objects/raw-comment-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-comment-template',
  standalone: true,
  imports: [CommonModule, ReplyTemplateComponent],
  templateUrl: './comment-template.component.html',
  styleUrl: './comment-template.component.scss'
})
export class CommentTemplateComponent implements OnInit {
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  @Input()
  public comment: CommentModel = {
    postId: '',
    profilePicture: '',
    username: '',
    comment: '',
    likes: [],
    replies: [],
    commentDate: ''
  };

  replies: ReplyModel[] = [];


  ngOnInit() {

  }

  populateReplies(comment: CommentModel) {
    let rawComments: RawCommentModel[] = this.localStorageService.getInformation('rawComments');
    let rawUsersComments: RawCommentModel[] = rawComments.;

    for(let i = 0; i < rawComments.length; i++) {
      if(this.comment.postId.includes(rawComments[i].postId)) rawUsersComments.push(rawComments[i]);
    }

    this.postsComments = rawUsersComments.map((rawComment) => this.convertRawCommentToComment(rawComment));
    
    const privacyMode = document.querySelector(`.post-comment-2 .view-replies`);
    privacyMode!.textContent = ' - Hide Replies - ';

/*     if(privacyMode?.classList.contains('active')) {
      //privacyMode!.textContent = ` - View ${this.comment.replies.length} Replies - `;
      this.replies = [];
      privacyMode?.classList.toggle('active');
    } else {
      //privacyMode!.textContent = ' - Hide Replies - ';
      this.replies = this.sortRepliesByDate(this.comment.replies);
      privacyMode?.classList.toggle('active');
    } */
  }

  onReply(comment: CommentModel) {
    throw new Error('Method not implemented.');
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

  //profilePicture.jpg::::HoldenBourg::::I love replying::::22::::04-10-2003
  sortRepliesByDate(replies: ReplyModel[]) {
    replies.sort((a: ReplyModel, b: ReplyModel) => {
      let aDate: Date = new Date(a.commentDate);
      let bDate: Date = new Date(b.commentDate);
      
      return bDate.getTime() - aDate.getTime();
    });

    return replies;
  }
}
