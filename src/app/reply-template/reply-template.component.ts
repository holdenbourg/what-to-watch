import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { style } from '@angular/animations';

@Component({
  selector: 'app-reply-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reply-template.component.html',
  styleUrl: './reply-template.component.scss'
})
export class ReplyTemplateComponent {
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  @Input()
  public reply: ReplyModel = {
    commentId: '',
    replyId: '',
    profilePicture: '',
    username: '',
    comment: '',
    likes: [],
    commentDate: ''
  }

  onReply(reply: ReplyModel) {
    throw new Error('Method not implemented.');
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
  
        if(usedCaption.indexOf(' ') != -1) finalString = usedCaption.substring(0, usedCaption.indexOf(' '));
        else  finalString = usedCaption.substring(0);      
    
        newCaption = newCaption.replace(finalString, `<span style="font-weight: 600;">${finalString}</span>`);
  
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
}
