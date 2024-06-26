import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RoutingService } from '../services/routing/routing.service';
import { ReplyService } from '../services/reply/reply.service';

@Component({
  selector: 'app-reply-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reply-template.component.html',
  styleUrl: './reply-template.component.scss'
})
export class ReplyTemplateComponent {
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public routingService: RoutingService = inject(RoutingService);
  public replyService: ReplyService = inject(ReplyService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  @Input()
  public reply: ReplyModel = {
    commentId: '',
    replyId: '',
    profilePicture: '',
    username: '',
    replyingToUsername: '',
    comment: '',
    likes: [],
    commentDate: ''
  }


  onLike() {
    if(this.reply.likes.includes(this.currentUser.username)) {
      const index = this.reply.likes.indexOf(this.currentUser.username, 0);

      if (index > -1) {
        this.reply.likes.splice(index, 1);
      }
    } else {
      this.reply.likes.push(this.currentUser.username);
    }    

    //update the likes for that post in database
    let replies: ReplyModel[] = this.localStorageService.getInformation('replies');

    for(let reply of replies) {
      if(reply.replyId == this.reply.replyId) {
        reply.likes = this.reply.likes;
      }
    }

    this.localStorageService.clearInformation('replies');
    this.localStorageService.setInformation('replies', replies);
  }

  onReply(reply: ReplyModel) {
    const prompt = document.querySelector(`.prompt`);
    prompt!.textContent = `Replying to ${reply.username}`;

    this.replyService.commentId = reply.commentId;
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

      const commentReplyId = document.getElementById(`actual-reply-${this.reply.replyId}`)!;    
      commentReplyId.innerHTML = newCaption;

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

  attedUserClicked(attedUser: string) {
    this.routingService.navigateToAccountsPosts(attedUser);
  }
}
