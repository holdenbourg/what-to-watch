import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { ActivatedRoute } from '@angular/router';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { UserPostTemplateComponent } from '../user-post-template/user-post-template.component';
import { FollowerTemplateComponent } from '../follower-template/follower-template.component';
import { FollowingTemplateComponent } from '../following-template/following-template.component';
import { RequestTemplateComponent } from '../request-template/request-template.component';
import { FollowerFollowingTemplateComponent } from '../follower-following-template/follower-following-template.component';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { RawCommentModel } from '../services/models/database-objects/raw-comment-model';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UserPostTemplateComponent, 
    FollowerTemplateComponent, 
    FollowingTemplateComponent, 
    RequestTemplateComponent, 
    FollowerFollowingTemplateComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent  implements OnInit {
onComment() {
throw new Error('Method not implemented.');
}
toggleCommentLabel() {
throw new Error('Method not implemented.');
}
onSend() {
throw new Error('Method not implemented.');
}
onLike() {
throw new Error('Method not implemented.');
}
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public userAccount: AccountInformationModel = {
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
    postIds: [],
    taggedPostIds: [],
    archivedPostIds: [],
    dateJoined: '',
    private: false
  }
  public usersPosts: UserPostModel[] = [];
  public postsComments: CommentModel[] = [];

  public username: string = '';
  
  public followers: boolean = true;
  public following: boolean = false;
  public requests: boolean = false;

  public doesUserExistResult: boolean = true;
  public isCurrentUserResult: boolean = false;
  public userBlockedCurrentUserResult: boolean = false;
  public currentUserBlockedUserResult: boolean = false;
  public currentUserFollowsUserResult: boolean = false;
  public currentUserRequestedUserResult: boolean = false;
  public userFollowsCurrentUserResult: boolean = false;
  public userRequestedCurrentUserResult: boolean = false;
  public privateUserNotFollowedByCurrentUserResult: boolean = true;
  public publicUserNotFollowedByCurrentUserResult: boolean = true;

  public commentInput: string = '';


  ngOnInit() {   
    //sets the username from the url parameter
    this.username = this.activatedRoute.snapshot.params['username'];

    this.doesUserExist();

    let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');

    if(this.doesUserExistResult) {
      for(let i = 0; i < rawUsers.length; i++) {
        if(rawUsers.at(i)!.username == this.username) this.userAccount = this.convertRawUserToUser(rawUsers.at(i)!);
      }
    
      this.isCurrentUser();
      this.userBlockedCurrentUser();
      this.currentUserBlockedUser();
      this.currentUserFollowsUser();
      this.currentUserRequestedUser();
      this.userFollowsCurrentUser();
      this.userRequestedCurrentUser();
      this.publicUserNotFollowedByCurrentUser();
      this.privateUserNotFollowedByCurrentUser(); 
    }

    // console.log('does user exist: ' + this.doesUserExistResult)
    // console.log('is current user: ' + this.isCurrentUserResult);
    // console.log('user blocked current user: ' + this.userBlockedCurrentUserResult);
    // console.log('user is blocked current user: ' + this.currentUserBlockedUserResult);
    // console.log('current user follows user: ' + this.currentUserFollowsUserResult);
    // console.log('current user requested user: ' + this.currentUserRequestedUserResult)
    // console.log('user follows current user: ' + this.userFollowsCurrentUserResult);
    // console.log('user requested current user: ' + this.userRequestedCurrentUserResult);
    // console.log('private user not followed current user: ' + this.privateUserNotFollowedByCurrentUserResult);
    // console.log('public user not followed current user: ' + this.publicUserNotFollowedByCurrentUserResult);

    this.populatePostsAndComments();

    this.sidebarCloseOnResize();

    var width = window.innerWidth;

    if(width <= 1275) { 
      const themeClass = document.querySelector('.sidebar');
      themeClass?.classList.toggle('active'); 
    }
    
    //sets active follower-type to followers
    this.localStorageService.clearInformation('follower-type');
    this.localStorageService.setInformation('follower-type', 'followers');
  }

  
  populatePostsAndComments() {
    let rawPosts: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');
    let rawComments: RawCommentModel[] = this.localStorageService.getInformation('rawComments');

    let rawUsersPosts: RawUserPostModel[] = [];
    let rawUsersComments: RawCommentModel[] = [];

    for(let i = 0; i < rawPosts.length; i++) {
      if(this.userAccount.postIds.includes(rawPosts[i].postId)) rawUsersPosts.push(rawPosts[i]);
    }
    for(let i = 0; i < rawComments.length; i++) {
      if(this.userAccount.postIds.includes(rawComments[i].postId)) rawUsersComments.push(rawComments[i]);
    }

    this.usersPosts = rawUsersPosts.map((rawPost) => this.convertRawPostToPost(rawPost));
    this.postsComments = rawUsersComments.map((rawComment) => this.convertRawCommentToComment(rawComment));
  }

  toggleFollowers() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'followers' && !this.followers) {
      if(this.following) {
        this.following = !this.following;
      } else if (this.requests) {
        this.requests = !this.requests;
      }

      this.followers = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'followers');

      const followers = document.querySelector('.followers');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
  }
  toggleFollowing() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'following' && !this.following) {
      if(this.followers) {
        this.followers = !this.followers;
      } else if (this.requests) {
        this.requests = !this.requests;
      }

      this.following = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'following');

      const followers = document.querySelector('.following');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
  }
  toggleRequests() {
    var activeFollowerType = this.localStorageService.getInformation('follower-type');

    if(activeFollowerType != 'requests' && !this.requests) {
      if(this.followers) {
        this.followers = !this.followers;
      } else if (this.following) {
        this.following = !this.following;
      }

      this.requests = true;

      this.localStorageService.clearInformation('follower-type');
      this.localStorageService.setInformation('follower-type', 'requests');

      const followers = document.querySelector('.requests');
      followers?.classList.toggle('active');

      const themeClass = document.querySelector(`.${activeFollowerType}`);
      themeClass?.classList.toggle('active');
    }
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

  onPostClicked(post: UserPostModel) {
    if(post.postId.charAt(0) == 'm') {
      let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
      let movie: RatedMovieModel = ratedMovies.filter((movie) => movie.postId == post.postId).at(0)!;
      
      console.log(post);
      console.log(movie);
      this.navigateToPostMovie(post.postId);
    } else {
      let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
      let series: RatedSeriesModel = ratedSeries.filter((series) => series.postId == post.postId).at(0)!;

      console.log(post);
      console.log(series);
    }

  }
  onEditProfile() {
    this.routingService.navigateToSettings();
  }

  doesUserExist() {
    let userExistsInDB: boolean = false;

    let users: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers')

    for(let i = 0; i < users.length; i++) {
      if(users.at(i)!.username == this.username) userExistsInDB = true;
    }

    if(userExistsInDB == false) {
      this.doesUserExistResult = false;
      this.isCurrentUserResult = false;
      this.userBlockedCurrentUserResult = false;
      this.currentUserBlockedUserResult = false;
      this.currentUserFollowsUserResult = false;
      this.currentUserRequestedUserResult = false;
      this.userFollowsCurrentUserResult = false;
      this.userRequestedCurrentUserResult = false;
      this.privateUserNotFollowedByCurrentUserResult = false;
      this.publicUserNotFollowedByCurrentUserResult = false;
    }
  }
  //account is current user (HoldenBourg)
  isCurrentUser() {
    if(this.currentUser.username === this.userAccount.username) {
      this.isCurrentUserResult = true;
    }

    //edit profile
    //view archive (maybe in future)
  }
  //account blocked current user (LukasGocke)
  userBlockedCurrentUser() {
    //pull user from users db using username
    //loop through the users blocked accounts list for the current users username
    for(let blockedUser of this.userAccount.blocked) {
      if(blockedUser.username === this.currentUser.username) {
        this.userBlockedCurrentUserResult = true;
      } 
    }

    //no buttons
    //no posts
    //can't click followers/following
    //"this user has you blocked"
  }
  //account is blocked by current user (CalebHaralson)
  currentUserBlockedUser() {
    for(let blockedUser of this.currentUser.blocked) {
      if(blockedUser.username === this.username) {
        this.currentUserBlockedUserResult = true;
      } 
    }

    //unblock
    //no posts
    //can't click followers/following
    //"you've blocked this user"
  }
  //account is followed by current user/mutual following (EnriqueLeal)
  currentUserFollowsUser() {
    for(let followedUser of this.currentUser.following) {
      if(followedUser.username === this.username) {
        this.currentUserFollowsUserResult = true;
      } 
    }

    //unfollow
    //message
  }
  //current user requested to follow user (JohnDiggle)
  currentUserRequestedUser() {
    if(this.userAccount.private == true) {
      for(let requestedUser of this.userAccount.requests) {
        if(requestedUser.username === this.currentUser.username) {
          this.currentUserRequestedUserResult = true;
        } 
      }
    }

    //requested
  }
  //account is following current user but current user doesn't follow user (AshlynnDang)
  userFollowsCurrentUser() {
    if(this.currentUser.private == false) {
      for(let follower of this.userAccount.following) {
        if(follower.username === this.currentUser.username && this.currentUserFollowsUserResult == false) {
          this.userFollowsCurrentUserResult = true;
        } 
      }
    }


    //follow back
    //message
  }
  //account requested to follow private current user but current user doesn't follow user (AshlynnDang)
  //if user switches to public requests transfer to followers, and currentUser gets added to users following
  userRequestedCurrentUser() {
    if(this.currentUser.private == true) {
      for(let requestedUser of this.currentUser.requests) {
        if(requestedUser.username === this.userAccount.username && this.currentUserFollowsUserResult == false) {
          this.userRequestedCurrentUserResult = true;
        } 
      }
    }


    //accept request
  }
  //current user doesn't follow private user (OliverQueen)
  privateUserNotFollowedByCurrentUser() {
    if(this.isCurrentUserResult) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.userAccount.private == false) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.userBlockedCurrentUserResult || this.currentUserBlockedUserResult) this.privateUserNotFollowedByCurrentUserResult = false;
    if(this.currentUserRequestedUserResult) this.privateUserNotFollowedByCurrentUserResult = false;

    //pull user from users db using username
    if(this.userAccount.private == true) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.privateUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }

    //request
  }
  //current user doesn't follow public user (TommyMerlin)
  publicUserNotFollowedByCurrentUser() {
    if(this.isCurrentUserResult) this.publicUserNotFollowedByCurrentUserResult = false;
    if(this.userAccount.private == true) this.publicUserNotFollowedByCurrentUserResult = false;
    if(this.userBlockedCurrentUserResult || this.currentUserBlockedUserResult) this.publicUserNotFollowedByCurrentUserResult = false;

    //pull user from users db using username
    if(this.userAccount.private == false) {
      for(let followedUser of this.currentUser.following) {
        if(followedUser.username === this.username) {
          this.publicUserNotFollowedByCurrentUserResult = false;
        } 
      }
    }

    //follow
    //message
  }

  //converts the users db raw output into AccountInformationModel
  convertRawUserToUser(rawUser: RawAccountInformationModel) {
    let user: AccountInformationModel = {
      profilePicture: rawUser.profilePicture,
      username: rawUser.username,
      password: rawUser.password,
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      bio: rawUser.bio,
      followers: this.convertRawFollowersToFollowers(rawUser.followers),
      following: this.convertRawFollowersToFollowers(rawUser.following),
      requests: this.convertRawFollowersToFollowers(rawUser.requests),
      blocked: this.convertRawFollowersToFollowers(rawUser.blocked),
      postIds: rawUser.postIds,
      taggedPostIds: rawUser.taggedPostIds,
      archivedPostIds: rawUser.archivedPostIds,
      dateJoined: rawUser.dateJoined,
      private: rawUser.private
    }

    return user;
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
  //converts the comments db raw output into CommentModel
  convertRawCommentToComment(rawComment: RawCommentModel) {
    let comment: CommentModel = {
      postId: rawComment.postId,
      profilePicture: rawComment.profilePicture,
      username: rawComment.username,
      comment: rawComment.comment,
      likes: rawComment.likes,
      replies: this.convertRawRepliesToReplies(rawComment.replies),
      commentDate: rawComment.commentDate
    }

    return comment;
  }
  //rawReply: profilePicture.jpg::::HoldenBourg::::I love replying::::22::::04-10-2003
  convertRawRepliesToReplies(rawReplies: string[]) {
    let returnArray: ReplyModel[] = [];

    rawReplies.forEach((rawReplyString) => {
      let splitArray = rawReplyString.split('::::');

      let reply: ReplyModel = {
        profilePicture: splitArray.at(0)!,
        username: splitArray.at(1)!,
        comment: splitArray.at(2)!,
        likes: splitArray.at(3)!.split(','),
        commentDate: splitArray.at(4)!
      }

      returnArray.push(reply);
    })

    return returnArray;
  }

  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToLogin() {
    this.routingService.navigateToLogin();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
  }  
  navigateToSearchSeries() {
    this.routingService.navigateToSearchSeries();
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
  navigateToPostMovie(postId: string) {
    this.routingService.navigateToPostMovie(postId);
  }
  navigateToPostSeries(postId: string) {
    this.routingService.navigateToPostSeries(postId);
  }
  navigateToAccountsPosts() {
    this.routingService.navigateToAccountsPosts(this.currentUser.username);
  }
  navigateToAccountsTagged() {
    this.routingService.navigateToAccountsTagged(this.currentUser.username);
  }
  navigateToAccountsArchived() {
    this.routingService.navigateToAccountsArchived(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }

  sortByDate(posts: UserPostModel[]) {
    posts.sort((a: UserPostModel, b: UserPostModel) => {
      let aDate: Date = new Date(a.postDate);
      let bDate: Date = new Date(b.postDate);
      
      return aDate.getTime() - bDate.getTime();
    });

    return posts;
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }

  //method for creating postId's
  /*for(let i = 0; i < 8; i++) {
    var id = "m" + Math.random().toString(16).slice(2);
    var id2 = "s" + Math.random().toString(16).slice(2);
  
    console.log(id);
    console.log(id2);
  }*/
}
