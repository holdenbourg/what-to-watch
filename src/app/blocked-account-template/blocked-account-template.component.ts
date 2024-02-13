import { Component, Input } from '@angular/core';
import { FollowerModel } from '../services/models/follower-model';

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

}
