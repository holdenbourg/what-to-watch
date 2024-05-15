import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-movie.component.html',
  styleUrl: './post-movie.component.scss'
})
export class PostMovieComponent implements OnInit {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public currentPostingMovie: RatedMovieModel = this.localStorageService.getInformation('currentPostMovie');
  public caption: string = '';
  public captionWarning: string = 'What';


  ngOnInit() {
    this.localStorageService.clearInformation('currentRateMovie');

  }


  onArchive() {
    throw new Error('Method not implemented.');
  }
  onPost() {
    throw new Error('Method not implemented.');
  }
  onCheckCaption() {
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

  //checks to see if the same person is atted twice 
  userAttedTwice(comment: string) {
    const count = comment.split('@').length - 1; 

    if(count == 0 || count == 1) {
      return false;
    } else {
      let newComment: string = comment;

      for(let i = 0; i < count; i++) {
        let index: number = newComment.indexOf('@');
      
        newComment = newComment.substring(index);

        let attedUsername: string = '';

        if(newComment.indexOf(' ') != -1) attedUsername = newComment.substring(0, newComment.indexOf(' '));
        else attedUsername = newComment.substring(0);

        newComment = newComment.substring(attedUsername.length);
        
        if(newComment.includes(attedUsername)) {
          return true;
        }
      }

      return false;
    }
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
      
      const element = document.getElementById("actual-comment")!;
      element.innerHTML = newCaption;

      return;
    }
  }

  checkCaptionLengthMinimum(input: string) {
    if (input.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  checkCaptionLengthMaximum(input: string) {
    if (input.length > 150) {
      return false;
    } else {
      return true;
    }
  }
}
