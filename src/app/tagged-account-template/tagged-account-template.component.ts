import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-tagged-account-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tagged-account-template.component.html',
  styleUrl: './tagged-account-template.component.scss'
})
export class TaggedAccountTemplateComponent {
  @Input()
  public taggedAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public taggedAccounts: FollowerModel[] = this.localStorageService.getInformation('taggedAccounts');

  undoTagAccount(alreadyTaggedAccount: FollowerModel) {
    this.taggedAccounts = this.taggedAccounts.filter((taggedAccount) => taggedAccount.username != alreadyTaggedAccount.username);

    if(this.taggedAccounts.length == 0) {
      this.localStorageService.clearInformation('taggedAccounts');
    } else {
      this.localStorageService.clearInformation('taggedAccounts');
      this.localStorageService.setInformation('taggedAccounts', this.taggedAccounts);
    }

    window.location.reload();
  }
}
