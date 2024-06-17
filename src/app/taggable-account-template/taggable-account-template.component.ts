import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-taggable-account-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taggable-account-template.component.html',
  styleUrl: './taggable-account-template.component.scss'
})
export class TaggableAccountTemplateComponent {
  @Input()
  public taggableAccount: FollowerModel = {
    profilePicture: '',
    username: ''
  }
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public taggedAccounts: FollowerModel[] = this.localStorageService.getInformation('taggedAccounts');


  tagAccount(taggedAccount: FollowerModel) {
    if(this.taggedAccounts == undefined) this.taggedAccounts = []; 

    if(this.taggedAccounts.length == 15) {
      const tagWarning = document.querySelector('.tag-warning');

      tagWarning!.textContent = `You can only tag up to 15 people`;
      setTimeout(() => {tagWarning!.textContent = ``;}, 3000);
    } else {
      this.taggedAccounts.push(taggedAccount);

      this.localStorageService.clearInformation('taggedAccounts');
      this.localStorageService.setInformation('taggedAccounts', this.taggedAccounts);
  
      window.location.reload();
    }
  }
}