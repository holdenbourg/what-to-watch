import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { CommentModel } from '../services/models/database-objects/comment-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { RoutingService } from '../services/routing/routing.service';
import { CommonModule } from '@angular/common';
import { UserPostTemplateComponent } from '../user-post-template/user-post-template.component';
import { FormsModule } from '@angular/forms';
import { FollowerFollowingTemplateComponent } from '../follower-following-template/follower-following-template.component';
import { FollowerTemplateComponent } from '../follower-template/follower-template.component';
import { FollowingTemplateComponent } from '../following-template/following-template.component';
import { RequestTemplateComponent } from '../request-template/request-template.component';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { ReplyModel } from '../services/models/database-objects/reply-model';
import { CommentTemplateComponent } from '../comment-template/comment-template.component';
import { ReplyService } from '../services/reply/reply.service';

@Component({
  selector: 'app-account-tagged',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UserPostTemplateComponent, 
    FollowerTemplateComponent, 
    FollowingTemplateComponent, 
    RequestTemplateComponent, 
    FollowerFollowingTemplateComponent,
    CommentTemplateComponent],
  templateUrl: './account-tagged.component.html',
  styleUrl: './account-tagged.component.scss'
})

export class AccountTaggedComponent {
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public replyService: ReplyService = inject(ReplyService);
  
  public ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
  public ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');

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
  public usersTaggedPosts: UserPostModel[] = [];
  public taggedPostsComments: CommentModel[] = [];

  public currentTaggedPostNumber: number = 0;
  public currentTaggedPost: UserPostModel = {
    postId: '',
    profilePicture: '',
    username: '',
    poster: '',
    caption: '',
    likes: [],
    taggedUsers: [],
    postDate: ''
  };
  public currentComments: CommentModel[] = [];
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
  };
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
  };

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
  public commentWarning: string = '';


  ngOnInit() {   
    //sets the username from the url parameter
    this.username = this.activatedRoute.snapshot.params['username'];

    this.doesUserExist();

    let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers')

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

    let taggedPostNumber: number = this.localStorageService.getInformation('currentTaggedPostNumber');
    if(taggedPostNumber != undefined) this.currentTaggedPostNumber = taggedPostNumber;
  }


  /* TOGGLE SHOWN FOLLOWER LIST */
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

  
  /* CHECKS WHICH TYPE OF ACCOUNT SCREEN TO SHOW */
  //makes sure an account under that username exists
  doesUserExist() {
    let userExistsInDB: boolean = false;

    let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers')

    for(let i = 0; i < rawUsers.length; i++) {
      if(rawUsers.at(i)!.username == this.username) userExistsInDB = true;
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


  /* OBJECT CONVERSION FROM DATABASE */
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


  /* POST LOGIC */
  //adds all the users posts and post comments to a list to be displayed later
  populatePostsAndComments() {
    let rawPosts: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');
    let rawComments: CommentModel[] = this.localStorageService.getInformation('comments');

    let rawUsersPosts: RawUserPostModel[] = [];
    let rawUsersComments: CommentModel[] = [];

    for(let i = 0; i < rawPosts.length; i++) {
      if(this.userAccount.taggedPostIds.includes(rawPosts[i].postId)) rawUsersPosts.push(rawPosts[i]);
    }

    let postsByDate = new Map<string, RawUserPostModel[]>();
    let postDates: string[] = []

    for(let i = 0; i < rawUsersPosts.length; i++) {
      let currentRawUserPost: RawUserPostModel = rawUsersPosts.at(i)!;

      if(postsByDate.has(currentRawUserPost.postDate)) {
        let postsOnDate = postsByDate.get(currentRawUserPost.postDate);
        postsOnDate!.push(currentRawUserPost);

        postsByDate.set(currentRawUserPost.postDate, postsOnDate!);
      } else {
        let newListOfPosts: RawUserPostModel[] = [currentRawUserPost];

        postsByDate.set(currentRawUserPost.postDate, newListOfPosts);

        postDates.push(currentRawUserPost.postDate);
      }
    }

    let sortedUserPosts: UserPostModel[] = [];
    for(let i = 0; i < postDates.length; i++) {
      let currentDate = this.sortDatesByDate(postDates).at(i)!;

      let currentValues: RawUserPostModel[] = postsByDate.get(currentDate)!;
      currentValues.forEach((rawPost) => {
        sortedUserPosts.push(this.convertRawPostToPost(rawPost));
      });
    }
  
    for(let i = 0; i < rawComments.length; i++) {
      if(this.userAccount.postIds.includes(rawComments[i].postId)) rawUsersComments.push(rawComments[i]);
    }

    this.usersTaggedPosts = sortedUserPosts.reverse();
    this.taggedPostsComments = rawUsersComments;
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
  //routes to the clicked users account
  attedUserClicked(attedUser: string) {
    this.routingService.navigateToAccountsPosts(attedUser);
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
  sortDatesByDate(posts: string[]) {
    posts.sort((a: string, b: string) => {
      let aDate: Date = new Date(a);
      let bDate: Date = new Date(b);
      
      return aDate.getTime() - bDate.getTime();
    });

    return posts;
  }
  sortByDate(posts: UserPostModel[]) {
    posts.sort((a: UserPostModel, b: UserPostModel) => {
      let aDate: Date = new Date(a.postDate);
      let bDate: Date = new Date(b.postDate);
      
      return bDate.getTime() - aDate.getTime();
    });

    return posts;
  }
  sortCommentsByDate(posts: CommentModel[]) {
    posts.sort((a: CommentModel, b: CommentModel) => {
      let aDate: Date = new Date(a.commentDate);
      let bDate: Date = new Date(b.commentDate);
      
      return bDate.getTime() - aDate.getTime();
    });

    return posts;
  }

  //generates commentId and makes sure it's unique
  generateUniqueCommentId() {
    let allComments: CommentModel[] = this.localStorageService.getInformation('comments');

    let commentId: string = 'c' + Math.random().toString(16).slice(2);
    let isUnique: boolean = false;

    while(!isUnique) {
      for(let i = 0; i < allComments.length; i++) {
        if(allComments[i].commentId == commentId) {
          commentId = 'c' + Math.random().toString(16).slice(2);
          break;
        } else if(i == (allComments.length - 1) && allComments[i].commentId != commentId) {
          isUnique = true;
        }
      }
    }

    return commentId;
  }
  //generates replyId and makes sure it's unique
  generateUniqueReplyId() {
    let allReplies: ReplyModel[] = this.localStorageService.getInformation('replies');

    let replyId: string = 'r' + Math.random().toString(16).slice(2);
    let isUnique: boolean = false;

    while(!isUnique) {
      for(let i = 0; i < allReplies.length; i++) {
        if(allReplies[i].replyId == replyId) {
          replyId = 'r' + Math.random().toString(16).slice(2);
          break;
        } else if(i == (allReplies.length - 1) && allReplies[i].replyId != replyId) {
          isUnique = true;
        }
      }
    }

    return replyId;
  }

  //checks if a tagged post was active before browser refresh
  checkPostActive() {
    let currentTaggedPostNumber: number = this.localStorageService.getInformation('currentTaggedPostNumber');

    if(currentTaggedPostNumber != undefined) {
      if(this.usersTaggedPosts.at(currentTaggedPostNumber)!.postId.charAt(0) == 'm') {
        let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
        let movie: RatedMovieModel = ratedMovies.filter((movie) => movie.postId == this.usersTaggedPosts.at(currentTaggedPostNumber)!.postId).at(0)!;
  
        this.currentTaggedPost = this.usersTaggedPosts.at(currentTaggedPostNumber)!;
        this.currentRatedMovie = movie;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(currentTaggedPostNumber)!.postId);
      } else {
        let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
        let series: RatedSeriesModel = ratedSeries.filter((series) => series.postId == this.usersTaggedPosts.at(currentTaggedPostNumber)!.postId).at(0)!;
  
        this.currentTaggedPost = this.usersTaggedPosts.at(currentTaggedPostNumber)!;
        this.currentRatedSeries = series;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(currentTaggedPostNumber)!.postId);
      }
    
      return true;
    }

    return false;
  }

  //turns post screen active with the clicked tagged post's information
  onPostClicked(post: UserPostModel, postNumber: number) {
    if(post.postId.charAt(0) == 'm') {
      let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
      let movie: RatedMovieModel = ratedMovies.filter((movie) => movie.postId == post.postId).at(0)!;
      
      const moviePostContainer = document.querySelector('.show-post');
      moviePostContainer?.classList.toggle('active');

      this.localStorageService.setInformation('currentTaggedPostNumber', postNumber);
      this.currentTaggedPostNumber = postNumber;
      this.currentTaggedPost = post;
      this.currentRatedMovie = movie;
      this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == post.postId);
    } else {
      let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
      let series: RatedSeriesModel = ratedSeries.filter((series) => series.postId == post.postId).at(0)!;
            
      const seriesPostContainer = document.querySelector('.show-post');
      seriesPostContainer?.classList.toggle('active');

      this.localStorageService.setInformation('currentTaggedPostNumber', postNumber);
      this.currentTaggedPostNumber = postNumber;
      this.currentTaggedPost = post;
      this.currentRatedSeries = series;
      this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == post.postId);
    }
  }
  //closes the post screen
  onBackOut() {
    const postContainer = document.querySelector('.show-post');
    postContainer?.classList.toggle('active');

    this.localStorageService.clearInformation('currentTaggedPostNumber');
  }
  //shows next post in line
  onRightPost() {  
    if(this.currentTaggedPostNumber <= this.usersTaggedPosts.length - 1) {
      if(this.usersTaggedPosts.at(this.currentTaggedPostNumber + 1)!.postId.charAt(0) == 'm') {
        this.currentTaggedPostNumber = this.currentTaggedPostNumber + 1;
        this.localStorageService.setInformation('currentTaggedPostNumber', this.currentTaggedPostNumber);
        this.currentTaggedPost = this.usersTaggedPosts.at(this.currentTaggedPostNumber)!;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId);
        this.currentRatedMovie = this.ratedMovies.filter((movie) => movie.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId).at(0)!;
        
      } else {
        this.currentTaggedPostNumber = this.currentTaggedPostNumber + 1;
        this.localStorageService.setInformation('currentTaggedPostNumber', this.currentTaggedPostNumber);
        this.currentTaggedPost = this.usersTaggedPosts.at(this.currentTaggedPostNumber)!;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId);
        this.currentRatedSeries = this.ratedSeries.filter((series) => series.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId).at(0)!;
      }

      const prompt = document.querySelector(`.prompt`);
      prompt!.textContent = `Comment`;
    }
  }
  //shows previous post in line
  onLeftPost() {
    if(this.currentTaggedPostNumber > 0) {
      if(this.usersTaggedPosts.at(this.currentTaggedPostNumber - 1)!.postId.charAt(0) == 'm') {
        this.currentTaggedPostNumber = this.currentTaggedPostNumber - 1;
        this.localStorageService.setInformation('currentTaggedPostNumber', this.currentTaggedPostNumber);
        this.currentTaggedPost = this.usersTaggedPosts.at(this.currentTaggedPostNumber)!;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId);
        this.currentRatedMovie = this.ratedMovies.filter((movie) => movie.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId).at(0)!;
      } else {
        this.currentTaggedPostNumber = this.currentTaggedPostNumber - 1;
        this.localStorageService.setInformation('currentTaggedPostNumber', this.currentTaggedPostNumber);
        this.currentTaggedPost = this.usersTaggedPosts.at(this.currentTaggedPostNumber)!;
        this.currentComments = this.taggedPostsComments.filter((comment) => comment.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId);
        this.currentRatedSeries = this.ratedSeries.filter((series) => series.postId == this.usersTaggedPosts.at(this.currentTaggedPostNumber)!.postId).at(0)!;
      }
      
      const prompt = document.querySelector(`.prompt`);
      prompt!.textContent = `Comment`;
    }
  }

  //toggles the comment input box prompt on and off
  onCommentClick() {
    const prompt = document.querySelector('.prompt');

    if(!(prompt?.classList.contains('active'))) prompt?.classList.toggle('active'); 
  }
  onCommentUnClick() {
    const prompt = document.querySelector('.prompt');

    if(prompt?.classList.contains('active') && this.commentInput.length == 0) prompt?.classList.toggle('active');
  }

  //button to send post to other users
  onSend() {
  }
  //button to like the current post
  onLike() {
    if(this.currentTaggedPost.likes.includes(this.currentUser.username)) {
      const index = this.currentTaggedPost.likes.indexOf(this.currentUser.username, 0);

      if (index > -1) {
        this.currentTaggedPost.likes.splice(index, 1);
      }
    } else {
      this.currentTaggedPost.likes.push(this.currentUser.username);
    }    

    //update the likes for that post in database
    let rawPosts: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');

    for(let post of rawPosts) {
      if(post.postId == this.currentTaggedPost.postId) {
        post.likes = this.currentTaggedPost.likes;
      }
    }

    this.localStorageService.clearInformation('rawPosts');
    this.localStorageService.setInformation('rawPosts', rawPosts);
  }
  //button to submit the comment in the comment input box
  onPostComment() {
    if(this.commentInput.length <= 0) {
      this.commentWarning = `Comment must be between 2 and 150 characters`;
      setTimeout(() => {this.commentWarning = ``;}, 3000);
      return;
    } else if(this.commentInput.length >= 150) {
      this.commentWarning = `Comment must be between 2 and 150 characters`;
      setTimeout(() => {this.commentWarning = ``;}, 3000);
      return;
    } else if (this.userAttedTwice(this.commentInput)) {
      this.commentWarning = `Comment can't @ the same user twice`;
      setTimeout(() => {this.commentWarning = ``;}, 3000);
      return;
    } 

    const prompt = document.querySelector(`.prompt`);

    if(prompt!.textContent == 'Comment') {
      let comment: CommentModel = {
        postId: this.currentTaggedPost.postId,
        commentId: this.generateUniqueCommentId(),
        profilePicture: this.currentUser.profilePicture,
        username: this.currentUser.username,
        comment: this.commentInput,
        likes: [],
        commentDate: new Date().toJSON().slice(0, 10)
      }

      this.currentComments.push(comment);

      let allComments: CommentModel[] = this.localStorageService.getInformation('comments');
      allComments.push(comment);

      this.localStorageService.setInformation('comments', allComments);
    } else {
      let reply: ReplyModel = {
        commentId: this.replyService.commentId,
        replyId: this.generateUniqueReplyId(),
        profilePicture: this.currentUser.profilePicture,
        username: this.currentUser.username,
        replyingToUsername: prompt!.textContent!.split(' ').splice(-1)[0],
        comment: this.commentInput,
        likes: [],
        commentDate: new Date().toJSON().slice(0, 10)
      }

      let allReplies: ReplyModel[] = this.localStorageService.getInformation('replies');
      allReplies.push(reply);

      this.localStorageService.setInformation('replies', allReplies);     
    }

    location.reload();
  }


  /* OPEN/CLOSE SIDEBAR */
  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
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


  /* ROUTING LOGIC */
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
}