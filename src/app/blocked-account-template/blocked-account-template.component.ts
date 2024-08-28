import { Component, Input, inject } from '@angular/core';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RoutingService } from '../services/routing/routing.service';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';

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
    /* UPDATING CURRENT USER */
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
      isBlockedBy: this.currentUser.isBlockedBy,
      postIds: this.currentUser.postIds,
      taggedPostIds: this.currentUser.taggedPostIds,
      archivedPostIds: this.currentUser.archivedPostIds,
      dateJoined: this.currentUser.dateJoined,
      private: this.currentUser.private
    }

    //updates currentUsers blocked list
    this.localStorageService.clearInformation('currentUser');
    this.localStorageService.setInformation('currentUser', newUser);

    /* UPDATING USERS DATABASE */
    let rawUsers: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');    

    let currentUser: RawAccountInformationModel = rawUsers.filter((user) => user.username == this.currentUser.username).at(0)!;
    console.log(currentUser);

    let newCurrentUsersBlocked: string[] = currentUser.blocked.filter((blockedUser) => blockedUser.split('::::').at(1)! != username);

    let newCurrentUser: RawAccountInformationModel = {
      profilePicture: currentUser.profilePicture,
      username: currentUser.username,
      password: currentUser.password,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      bio: currentUser.bio,
      followers: currentUser.followers,
      following: currentUser.following,
      requests: currentUser.requests,
      blocked: newCurrentUsersBlocked,
      isBlockedBy: currentUser.isBlockedBy,
      postIds: currentUser.postIds,
      taggedPostIds: currentUser.taggedPostIds,
      archivedPostIds: currentUser.archivedPostIds,
      dateJoined: currentUser.dateJoined,
      private: currentUser.private
    }

    console.log(currentUser);

    let blockedUser: RawAccountInformationModel = rawUsers.filter((user) => user.username == username).at(0)!;
    console.log(blockedUser);

    let newUnblockedUsersIsBlockedBy: string[] = blockedUser.isBlockedBy.filter((isBlockedByUser) => isBlockedByUser.split('::::').at(1)! != this.currentUser.username);

    let newlyUnblockedUser: RawAccountInformationModel = {
      profilePicture: blockedUser.profilePicture,
      username: blockedUser.username,
      password: blockedUser.password,
      email: blockedUser.email,
      firstName: blockedUser.firstName,
      lastName: blockedUser.lastName,
      bio: blockedUser.bio,
      followers: blockedUser.followers,
      following: blockedUser.following,
      requests: blockedUser.requests,
      blocked: blockedUser.blocked,
      isBlockedBy: newUnblockedUsersIsBlockedBy,
      postIds: blockedUser.postIds,
      taggedPostIds: blockedUser.taggedPostIds,
      archivedPostIds: blockedUser.archivedPostIds,
      dateJoined: blockedUser.dateJoined,
      private: blockedUser.private
    }

    console.log(newlyUnblockedUser);

    let newRawUsers: RawAccountInformationModel[] = rawUsers.filter((user) => user.username != currentUser.username && user.username != blockedUser.username);
    newRawUsers.push(newCurrentUser);
    newRawUsers.push(newlyUnblockedUser);

    //updates blockedUsers isBlockedBy and currentUsers blocked list in users database
    this.localStorageService.clearInformation('rawUsers');
    this.localStorageService.setInformation('rawUsers', newRawUsers);

    window.location.reload();
  }
}
