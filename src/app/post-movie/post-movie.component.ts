import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FormsModule } from '@angular/forms';
import { TaggableAccountTemplateComponent } from '../taggable-account-template/taggable-account-template.component';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { TaggedAccountTemplateComponent } from '../tagged-account-template/tagged-account-template.component';
import { RawUserPostModel } from '../services/models/database-objects/raw-user-post-model';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-post-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, TaggableAccountTemplateComponent, TaggedAccountTemplateComponent],
  templateUrl: './post-movie.component.html',
  styleUrl: './post-movie.component.scss'
})
export class PostMovieComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public postId: string = '';

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public currentPostingMovie: RatedMovieModel = this.localStorageService.getInformation('currentPostMovie');
  public caption: string = '';
  public captionWarning: string = '';

  public searchInput: string = '';
  public taggableAccounts: FollowerModel[] = [];
  public taggedAccounts: FollowerModel[] = this.localStorageService.getInformation('taggedAccounts');
  public taggedAccountsString: string = '';

  public watchedWith: string = `*${this.currentUser.firstName} watched ${this.currentPostingMovie.title} with `;


  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['postId'];

    this.localStorageService.clearInformation('currentRateMovie');

    if(this.taggedAccounts == undefined) this.taggedAccounts = [];
    if(this.localStorageService.getInformation('currentCaption') != undefined) this.caption = this.localStorageService.getInformation('currentCaption');

    if(this.taggedAccounts.length == 0) {
      this.watchedWith = '';
    } else if(this.taggedAccounts.length == 1) {
      this.watchedWith = this.watchedWith + this.taggedAccounts.at(0)!.username + '*';
    } else if (this.taggedAccounts.length == 2) {
      this.watchedWith = this.watchedWith + this.taggedAccounts.at(0)!.username + ' and ' + this.taggedAccounts.at(1)!.username + '*';
    } else {
      for(let i = 0; i < this.taggedAccounts.length; i++) {
        if(i == this.taggedAccounts.length - 1) {
          this.watchedWith = this.watchedWith + 'and ' + this.taggedAccounts.at(i)!.username + '*';
        } else {
          this.watchedWith = this.watchedWith + this.taggedAccounts.at(i)!.username + ', ';
        }
      }
    }
  }

  ngOnDestroy() {
    this.localStorageService.clearInformation('taggedAccounts');
    this.localStorageService.clearInformation('currentCaption');
    this.localStorageService.clearInformation('currentPostMovie');
  }


  onArchive() {
    if(this.caption.length > 150) {
      this.captionWarning = 'Your caption cannot exceed 150 characters'
    } else {
      let post: RawUserPostModel = {
        postId: this.currentPostingMovie.postId,
        profilePicture: this.currentUser.profilePicture,
        username: this.currentUser.username,
        poster: this.currentPostingMovie.poster,
        caption: this.caption,
        likes: [],
        taggedUsers: this.convertTaggedAccounts(this.taggedAccounts),
        postDate: new Date().toJSON().slice(0, 10)
      }

      let currentUsersArchivedPosts: string[] = this.currentUser.archivedPostIds;
      currentUsersArchivedPosts.push(post.postId);
      this.currentUser.archivedPostIds = currentUsersArchivedPosts;

      let currentUsersDB: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');
      let newUsersDB: RawAccountInformationModel[] = currentUsersDB.filter((user) => user.username != this.currentUser.username);
      newUsersDB.push(this.convertUserToRawUser(this.currentUser));

      let currentPostsDB: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');
      currentPostsDB.push(post);

      let currentMoviesDB: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
      currentMoviesDB.push(this.currentPostingMovie);

      this.localStorageService.setInformation('currentUser', this.currentUser);
      this.localStorageService.setInformation('rawUsers', newUsersDB);
      this.localStorageService.setInformation('rawPosts', currentPostsDB);
      this.localStorageService.setInformation('ratedMovies', currentMoviesDB);

      this.routingService.navigateToAccountsArchived(this.currentUser.username);
    }
  }

  onPost() {
    if(this.caption.length > 150) {
      this.captionWarning = 'Your caption cannot exceed 150 characters'
      setTimeout(() => {this.captionWarning = ``;}, 3000);

    } else if(this.userAttedTwice(this.caption)) {
      this.captionWarning = 'You cannot @ the same user twice'
      setTimeout(() => {this.captionWarning = ``;}, 3000);

    } else {
      let post: RawUserPostModel = {
        postId: this.currentPostingMovie.postId,
        profilePicture: this.currentUser.profilePicture,
        username: this.currentUser.username,
        poster: this.currentPostingMovie.poster,
        caption: this.caption,
        likes: [],
        taggedUsers: this.convertTaggedAccounts(this.taggedAccounts),
        postDate: new Date().toJSON().slice(0, 10)
      }

      let currentUsersPosts: string[] = this.currentUser.postIds;
      currentUsersPosts.push(post.postId);
      this.currentUser.postIds = currentUsersPosts;

      let currentUsersDB: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');
      let newUsersDB: RawAccountInformationModel[] = currentUsersDB.filter((user) => user.username != this.currentUser.username);
      newUsersDB.push(this.convertUserToRawUser(this.currentUser));

      let currentPostsDB: RawUserPostModel[] = this.localStorageService.getInformation('rawPosts');
      currentPostsDB.push(post);

      let currentMoviesDB: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
      currentMoviesDB.push(this.currentPostingMovie);

      this.localStorageService.setInformation('currentUser', this.currentUser);
      this.localStorageService.setInformation('rawUsers', newUsersDB);
      this.localStorageService.setInformation('rawPosts', currentPostsDB);
      this.localStorageService.setInformation('ratedMovies', currentMoviesDB);

      this.addPostToTaggedUsersAccounts(post);

      this.routingService.navigateToAccountsPosts(this.currentUser.username);
    }
  }

  onSearchAccounts() {
    //clearing previous search
    this.taggableAccounts = [];

    if(this.searchInput.toLowerCase() == this.currentUser.username.toLowerCase()) {
      const tagWarning = document.querySelector('.tag-warning');

      tagWarning!.textContent = `You cannot tag yourself`;
      setTimeout(() => {tagWarning!.textContent = ``;}, 3000);

      return;
    }

    let users: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');

    users.forEach((user) => {
      let isAlreadyTagged: boolean = false;
      let wasSearched: boolean = user.username.toLowerCase() == this.searchInput.toLowerCase();

      if(this.taggedAccounts.length == 0) {
        if(wasSearched) this.taggableAccounts.push(user);
      } else {
        for(let i = 0; i < this.taggedAccounts.length; i++) {
          if(this.taggedAccounts.at(i)!.username == user.username) isAlreadyTagged = true;
        }

        if(!isAlreadyTagged && wasSearched) this.taggableAccounts.push(user);
      }});
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

  toggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(!(prompt?.classList.contains('active'))) prompt?.classList.toggle('active'); 
  }
  untoggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(prompt?.classList.contains('active') && this.searchInput.length == 0) prompt?.classList.toggle('active');
  }

  convertTaggedAccounts(taggedAccounts: FollowerModel[]) {
    let stringTaggedAccounts: string[] = [];

    taggedAccounts.forEach((taggedAccount) => {
      let taggedUser = taggedAccount.profilePicture + '::::' + taggedAccount.username;
      stringTaggedAccounts.push(taggedUser);
    })

    return stringTaggedAccounts;
  }

  addPostToTaggedUsersAccounts(post: RawUserPostModel) {
    let taggedUsers: string[] = post.taggedUsers;

    taggedUsers.forEach((taggedUser) => {
      let taggedUsername = taggedUser.split('::::').at(1);

      let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');

      let user: RawAccountInformationModel = rawUsers.filter((user) => user.username == taggedUsername).at(0)!;
      user.taggedPostIds.push(this.currentPostingMovie.postId);

      let newUsers : RawAccountInformationModel[] = rawUsers.filter((user) => user.username != taggedUsername);
      newUsers.push(user);

      this.localStorageService.clearInformation('rawUsers');
      this.localStorageService.setInformation('rawUsers', newUsers);
    });
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

  //converts the users db raw output into AccountInformationModel
  convertUserToRawUser(rawUser: AccountInformationModel) {
    let user: RawAccountInformationModel = {
      profilePicture: rawUser.profilePicture,
      username: rawUser.username,
      password: rawUser.password,
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      bio: rawUser.bio,
      followers: this.convertFollowersToRawFollowers(rawUser.followers),
      following: this.convertFollowersToRawFollowers(rawUser.following),
      requests: this.convertFollowersToRawFollowers(rawUser.requests),
      blocked: this.convertFollowersToRawFollowers(rawUser.blocked),
      postIds: rawUser.postIds,
      taggedPostIds: rawUser.taggedPostIds,
      archivedPostIds: rawUser.archivedPostIds,
      dateJoined: rawUser.dateJoined,
      private: rawUser.private
    }

    return user;
  }
  
  //rawFollower: profilePicture.jpg::::HoldenBourg
  convertFollowersToRawFollowers(followers: FollowerModel[]) {
    let returnArray: string[] = [];

    followers.forEach((follower) => {
      let followerString: string = follower.profilePicture + '::::' + follower.username;

      returnArray.push(followerString);
    });

    return returnArray;
  }

  saveCaption(caption: string) {
    this.localStorageService.setInformation('currentCaption', this.caption);
  }
}
