import { Component, Input, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-follower-template',
  standalone: true,
  imports: [],
  templateUrl: './follower-template.component.html',
  styleUrl: './follower-template.component.scss'
})
export class FollowerTemplateComponent {
  @Input()
  public followerAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }

  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');


  onUnfollowUser(username: string) {
    let followedUsers: FollowerModel[] = this.currentUser.followers;
    let newFollowedUsers: FollowerModel[] = [];

    for(let i = 0; i < followedUsers.length; i++) {
      if(followedUsers[i].username != username) {
        newFollowedUsers.push(followedUsers[i]);
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
      followers: newFollowedUsers,
      following: this.currentUser.following,
      requests: this.currentUser.requests,
      blocked: this.currentUser.blocked,
      postIds: this.currentUser.postIds,
      taggedPostIds: this.currentUser.taggedPostIds,
      archivedPostIds: this.currentUser.archivedPostIds,
      private: this.currentUser.private
    }

    //update users followedAccounts list in users db
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    window.location.reload();
  }
}
