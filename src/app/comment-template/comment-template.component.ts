import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentModel } from '../services/models/database-objects/comment-model';

@Component({
  selector: 'app-comment-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-template.component.html',
  styleUrl: './comment-template.component.scss'
})
export class CommentTemplateComponent {
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
}
