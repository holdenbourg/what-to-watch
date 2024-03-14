import { Component, Input, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-following-template',
  standalone: true,
  imports: [],
  templateUrl: './following-template.component.html',
  styleUrl: './following-template.component.scss'
})
export class FollowingTemplateComponent {
  @Input()
  public followingAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }

  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');


  onUnfollowUser(username: string) {
    let followingUsers: FollowerModel[] = this.currentUser.following;
    let newFollowingUsers: FollowerModel[] = [];

    for(let i = 0; i < followingUsers.length; i++) {
      if(followingUsers[i].username != username) {
        newFollowingUsers.push(followingUsers[i]);
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
      following: newFollowingUsers,
      requests: this.currentUser.requests,
      blocked: this.currentUser.blocked,
      posts: this.currentUser.posts,
      postsTaggedIn: this.currentUser.postsTaggedIn,
      archivedPosts: this.currentUser.archivedPosts,
      private: this.currentUser.private
    }

    //update users followingAccounts list in users db
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    window.location.reload();
  }
}
