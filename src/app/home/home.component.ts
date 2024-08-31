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
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FeedPostComponent } from '../feed-post/feed-post.component';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent, FeedPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public apiService: ApiService = inject(ApiService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  public omdbReturn: ExtensiveSearchFilmModel[] = [];
  public mdbReturn: SeriesResponseModel[] = [];

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public usersFeedPosts: UserPostModel[] = [];

  public searchInput: string = '';

  
  ngOnInit() {    
    //sets information for upcoming films
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();

    //sets posts for the users feed
    this.usersFeedPosts =  this.populateUsersFeed();

    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }
  
  //closes/opens sidebar if screen width goes above/below 1275 pixels
  sidebarCloseOnResize() {  
    const themeClass = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    var width = window.innerWidth;

    if(width <= 1275 && themeClass?.classList.contains('active')) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
    if(width >= 1275 && !(themeClass?.classList.contains('active'))) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
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

  populateUsersFeed() {
    let rawPosts: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');
    let posts: UserPostModel[] = rawPosts.map((rawPost) => this.convertRawPostToPost(rawPost));

    return posts;
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
  navigateToAccountsPosts() {
    this.routingService.navigateToAccountsPosts(this.currentUser.username);
  }
  navigateToAccountsTagged() {
    this.routingService.navigateToAccountsTagged(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }

  sortByDate(upcomingFilms: UpcomingFilmModel[]) {
    let filteredUpcomingFilms: UpcomingFilmModel[] = upcomingFilms.filter((upcomingFilm) => {
      let upcomingFilmDate: Date = new Date(upcomingFilm.release_date);
      let currentDate = new Date(new Date().toJSON().slice(0, 10));

      return upcomingFilmDate.getTime() >= currentDate.getTime();
    });
    
    filteredUpcomingFilms.sort((a: UpcomingFilmModel, b: UpcomingFilmModel) => {
      let aDate: Date = new Date(a.release_date);
      let bDate: Date = new Date(b.release_date);
      
      return aDate.getTime() - bDate.getTime();
    });

    return filteredUpcomingFilms;
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }

  //converts the posts db raw output into UserPostModel
  convertRawPostToPost(rawPost: RawUserPostModel) {
    let post: UserPostModel = {
      postId: rawPost.postId,
      profilePicture: rawPost.profilePicture,
      username: rawPost.username,
      poster: rawPost.poster,
      caption: rawPost.caption,
      likes: rawPost.likes,
      taggedUsers: this.convertRawFollowersToFollowers(rawPost.taggedUsers),
      postDate: rawPost.postDate
    }

    return post;
  }
  //rawFollower: profilePicture.jpg::::HoldenBourg
  convertRawFollowersToFollowers(rawFollowers: string[]) {
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
}