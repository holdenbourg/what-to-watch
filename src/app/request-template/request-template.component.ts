import { Component, Input, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-request-template',
  standalone: true,
  imports: [],
  templateUrl: './request-template.component.html',
  styleUrl: './request-template.component.scss'
})
export class RequestTemplateComponent {
  @Input()
  public requestAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }

  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');


  onAcceptUser(username: string) {
    let requestedUsers: FollowerModel[] = this.currentUser.requests;
    let newRequestedUsers: FollowerModel[] = [];

    let followedUsers: FollowerModel[] = this.currentUser.followers;

    for(let i = 0; i < requestedUsers.length; i++) {
      if(requestedUsers[i].username != username) {
        newRequestedUsers.push(requestedUsers[i]);
      } else if (requestedUsers[i].username == username) {
        followedUsers.push(requestedUsers[i]);
      }
    }

    let newUser: AccountInformationModel = {
      profilePicture: this.currentUser.profilePicture,
      username: this.currentUser.username,
      password: this.currentUser.password,
      email: this.currentUser.email,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      bio: this.currentUser.bio,
      followers: followedUsers,
      following: this.currentUser.following,
      requests: newRequestedUsers,
      blocked: this.currentUser.blocked,
      posts: this.currentUser.posts,
      postsTaggedIn: this.currentUser.postsTaggedIn,
      archivedPosts: this.currentUser.archivedPosts,
      private: this.currentUser.private
    }

    //update users followedAccounts list in users db
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    window.location.reload();
  }

  onDeclineUser(username: string) {
    let requestedUsers: FollowerModel[] = this.currentUser.requests;
    let newRequestedUsers: FollowerModel[] = [];

    for(let i = 0; i < requestedUsers.length; i++) {
      if(requestedUsers[i].username != username) {
        newRequestedUsers.push(requestedUsers[i]);
      }
    }

    let newUser: AccountInformationModel = {
      profilePicture: this.currentUser.profilePicture,
      username: this.currentUser.username,
      password: this.currentUser.password,
      email: this.currentUser.email,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      bio: this.currentUser.bio,
      followers: this.currentUser.followers,
      following: this.currentUser.following,
      requests: newRequestedUsers,
      blocked: this.currentUser.blocked,
      posts: this.currentUser.posts,
      postsTaggedIn: this.currentUser.postsTaggedIn,
      archivedPosts: this.currentUser.archivedPosts,
      private: this.currentUser.private
    }

    //update users followedAccounts list in users db
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    window.location.reload();
  }
}
