import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { ApiService } from '../services/api/api.service';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';
import { FormsModule } from '@angular/forms';
import { UpcomingFilmTemplateComponent } from '../upcoming-film-template/upcoming-film-template.component';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { CommentModel } from '../services/models/database-objects/comment-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public apiService: ApiService = inject(ApiService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public rawCurrentUser: RawAccountInformationModel = this.localStorageService.getInformation('currentUser');
  public currentUser: AccountInformationModel = {
    profilePicture: '',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    followers: [],
    following: [],
    requests: [],
    blocked: [],
    posts: [],
    postsTaggedIn: [],
    private: false
  };
  public username: string = this.localStorageService.getInformation('currentUser').username;
  
  public omdbReturn: ExtensiveSearchFilmModel[] = [];
  public mdbReturn: SeriesResponseModel[] = [];

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public searchInput: string = '';

  
  ngOnInit() {
    this.toggleActive();

    //converts the users db raw output
    this.currentUser = this.convertRawUserToUser(this.rawCurrentUser);
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', this.currentUser);
    
    //sets information for upcoming films
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();
  }
  
  convertRawUserToUser(rawUser: RawAccountInformationModel) {
    let user: AccountInformationModel = {
      profilePicture: rawUser.profilePicture,
      username: rawUser.username,
      password: rawUser.password,
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      bio: rawUser.bio,
      followers: this.convertRawFollowerToFollower(rawUser.followers),
      following: this.convertRawFollowerToFollower(rawUser.following),
      requests: this.convertRawFollowerToFollower(rawUser.requests),
      blocked: this.convertRawFollowerToFollower(rawUser.blocked),
      posts: this.convertRawPostsToPosts(rawUser.posts),
      postsTaggedIn: this.convertRawPostsToPosts(rawUser.postsTaggedIn),
      private: rawUser.private
    }

    return user;
  }
  //rawFollower: profilePicture.jpg::::HoldenBourg
  convertRawFollowerToFollower(rawFollowers: string[]) {
    let returnArray: FollowerModel[] = [];

    rawFollowers.forEach((rawFollowerString) => {
      let splitArray = rawFollowerString.split('::::');

      let follower: FollowerModel = {
        profilePicture: splitArray.at(0)!,
        username: splitArray.at(1)!
      }

      returnArray.push(follower);
    })

    return returnArray;
  }
  convertRawPostsToPosts(rawPosts: string[]) {
    let returnArray: UserPostModel[] = [];

    rawPosts.forEach((rawPostString) => {
      let splitArray = rawPostString.split('::::');

      let post: UserPostModel = {
        postUrl: splitArray.at(0)!,
        caption: this.convertRawCaptionToCaption(splitArray.at(1)!),
        tagged: splitArray.at(2)!.split(','),
        postDate: splitArray.at(3)!,
        likes: splitArray.at(4)!.split(','),
        comments: this.convertRawCommentsToComments(splitArray.at(5)!)
      }

      returnArray.push(post);
    })

    return returnArray;
  }
  //rawComment: HoldenBourg||||Looks kinda like @LukasGocke or @EnriqueLeal||||LukasGocke,EnriqueLeal;;;;LukasGocke||||I remember being there with @CalebHaralson||||CalebHaralson
  convertRawCommentsToComments(rawComment: string) {
    let returnArray: CommentModel[] = [];

    let commentsArray = rawComment.split(';;;;');

    commentsArray.forEach((rawCommentString) => {
      let splitArray = rawCommentString.split('||||');

      let comment: CommentModel = {
        username: splitArray.at(0)!,
        comment: splitArray.at(1)!,
        tagged: splitArray.at(2)!.split(',')
      }

      returnArray.push(comment);
    })

    return returnArray;
  }
  //rawCaption: HoldenBourg||||Loved being there with @LukasGocke||||LukasGocke
  convertRawCaptionToCaption(rawCaption: string) {
    let splitArray = rawCaption.split('||||');

    let caption: CommentModel = {
      username: splitArray.at(0)!,
      comment: splitArray.at(1)!,
      tagged: splitArray.at(2)!.split(',')
    }

    return caption;
  }
  getTaggedAccounts(comment: string) {
    let taggedAccountsString: string = '';

    let atIndexes: number[] = [];
    let searchIndex: number = 0;
    let atIndex: number = comment.indexOf('@', searchIndex);

    let count = 0; 
    for (let i = 0; i < comment.length; i++) { 
      if (comment.charAt(i) === '@') { 
        count++; 
      } 
    } 

    for(let i = 0; i < count; i++) {
      atIndex = comment.indexOf('@', searchIndex);

      atIndexes.push(atIndex);
      searchIndex = atIndex + 1;
    }

    for(let i = 0; i < atIndexes.length; i++) {
      let firstBreak = comment.substring(atIndexes[i]);

      if(firstBreak.indexOf(' ') == -1) {
        let taggedAccount: string = firstBreak.substring(1, firstBreak.length);

        //check if the account exists in the users database
        if(taggedAccount.length != 0) {
          taggedAccountsString = taggedAccountsString + taggedAccount;
        }
      } else {
        let taggedAccount: string = firstBreak.substring(1, firstBreak.indexOf(' '));
        
        //check if the account exists in the users database
        if(taggedAccount.length != 0) {
          taggedAccountsString = taggedAccountsString + taggedAccount;
        }
      }

      if(i != atIndexes.length - 1) {
        taggedAccountsString = taggedAccountsString + ',';
      }
    }

    return taggedAccountsString;
  }

  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
  }  
  navigateToMovies() {
    this.routingService.navigateToMovies();
  }
  navigateToShows() {
    this.routingService.navigateToShows();
  }
  navigateToSummary() {
    this.routingService.navigateToSummary();
  }
  navigateToAccount() {
    this.routingService.navigateToAccount();
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
  }
}



