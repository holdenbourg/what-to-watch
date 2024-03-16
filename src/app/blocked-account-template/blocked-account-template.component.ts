import { Component, Input, inject } from '@angular/core';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-blocked-account-template',
  standalone: true,
  imports: [],
  templateUrl: './blocked-account-template.component.html',
  styleUrl: './blocked-account-template.component.scss'
})
export class BlockedAccountTemplateComponent {
  @Input()
  public blockedAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  onUnblockUser(username: string) {
    let blockedUsers: FollowerModel[] = this.currentUser.blocked;
    let newBlockedUsers: FollowerModel[] = [];

    for(let i = 0; i < blockedUsers.length; i++) {
      if(blockedUsers[i].username != username) {
        newBlockedUsers.push(blockedUsers[i]);
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
      requests: this.currentUser.requests,
      blocked: newBlockedUsers,
      postIds: this.currentUser.postIds,
      taggedPostIds: this.currentUser.taggedPostIds,
      archivedPostIds: this.currentUser.archivedPostIds,
      private: this.currentUser.private
    }

    //update users blockedAccounts list in users db
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    window.location.reload();
  }
}
