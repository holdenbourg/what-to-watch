import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';

@Component({
  selector: 'app-searched-user-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searched-user-template.component.html',
  styleUrl: './searched-user-template.component.scss'
})
export class SearchedUserTemplateComponent {
  @Input()
  public searchedAccount: RawAccountInformationModel = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    bio: '',
    followers: [],
    following: [],
    requests: [],
    blocked: [],
    isBlockedBy: [],
    postIds: [],
    taggedPostIds: [],
    archivedPostIds: [],
    dateJoined: '',
    private: false
  }
}
