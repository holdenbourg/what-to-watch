import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { FeedCommentTemplateComponent } from '../feed-comment-template/feed-comment-template.component';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [CommonModule, FeedCommentTemplateComponent],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.scss'
})
export class FeedPostComponent implements OnInit {
  @Input()
  public feedPost: UserPostModel = {
    postId: '',
    profilePicture: '',
    username: '',
    poster: '',
    caption: '',
    likes: [],
    taggedUsers: [],
    postDate: ''
  }
  public currentRatedMovie: RatedMovieModel = {
    postId: '',
    poster: '',
    title: '',
    releaseDate: '',
    rated: '',
    runTime: 0,
    genres: [],
    acting: 0,
    visuals: 0,
    story: 0,
    climax: 0,
    pacing: 0,
    ending: 0,
    rating: 0,
    username: '',
    dateRated: ''
  }
  public currentRatedSeries: RatedSeriesModel = {
    postId: '',
    poster: '',
    title: '',
    releaseDate: '',
    rated: '',
    seasons: 0,
    episodes: 0,
    genres: [],
    acting: 0,
    visuals: 0,
    story: 0,
    pacing: 0,
    length: 0,
    ending: 0,
    rating: 0,
    username: '',
    dateRated: ''
  }

  public feedPostComments: CommentModel[] = [];
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');


  ngOnInit() {
    if(this.feedPost.postId.charAt(0) == 'm') {
      let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
      this.currentRatedMovie = ratedMovies.filter((ratedMovie) => ratedMovie.postId === this.feedPost.postId).at(0)!;
    } else {
      let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
      this.currentRatedSeries = ratedSeries.filter((ratedSeries) => ratedSeries.postId === this.feedPost.postId).at(0)!;
    }

    let comments: CommentModel[] = this.localStorageService.getInformation('comments');
    this.feedPostComments = comments.filter((comment) => comment.postId === this.feedPost.postId);
  }


  //button to like the current post
  onLike() {
    if(this.feedPost.likes.includes(this.currentUser.username)) {
      const index = this.feedPost.likes.indexOf(this.currentUser.username, 0);

      if (index > -1) {
        this.feedPost.likes.splice(index, 1);
      }
    } else {
      this.feedPost.likes.push(this.currentUser.username);
    }    

    //update the likes for that post in database
    let rawPosts: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');

    for(let post of rawPosts) {
      if(post.postId == this.feedPost.postId) {
        post.likes = this.feedPost.likes;
      }
    }

    this.localStorageService.clearInformation('rawPosts');
    this.localStorageService.setInformation('rawPosts', rawPosts);
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

  //bolds the account usernames that are atted(@)
  boldAttedUsernames(caption: string) {
    const count = caption.split('@').length - 1; 
    const element = document.getElementById(`actual-comment-${this.feedPost.postId}`)!;

    if(count == 0) {
      element.innerHTML = caption;

      return;
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
      element.innerHTML = newCaption;

      return;
    }
  }
}
