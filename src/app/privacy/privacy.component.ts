import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingService } from '../services/routing/routing.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { BlockedAccountTemplateComponent } from '../blocked-account-template/blocked-account-template.component';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, FormsModule, BlockedAccountTemplateComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  public username: string = this.localStorageService.getInformation('currentUser').username;

  ngOnInit() {
    this.toggleActive();

    if(this.currentUser.private == true) {
      const privacyMode = document.querySelector('.privacy-mode');
      privacyMode?.classList.toggle('active');
      const description = document.querySelector('.description');
      description?.classList.toggle('active');

      privacyMode!.textContent = 'Private';
      description!.textContent = `When your account is private, only the followers you've accepted can see your profile. This means someone you haven't approved won't be able to see any of your posts, any of the posts you've been tagged in, and wont be able to see the people on either you followers or following list.`;
    }
  }

  OnSwitchPrivacy() {
    //this.publicPrivate = !this.publicPrivate;
    const privacyMode = document.querySelector('.privacy-mode');
    privacyMode?.classList.toggle('active');
    const description = document.querySelector('.description');
    description?.classList.toggle('active');

    if(privacyMode?.classList.contains('active')) {
      privacyMode!.textContent = 'Private';
      description!.textContent = `When your account is private, only the followers you've accepted can see your profile. This means someone you haven't approved won't be able to see any of your posts, any of the posts you've been tagged in, and wont be able to see the people on either you followers or following list.`;

      let currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
      currentUser.private = true;

      this.localStorageService.clearInformation('currentUser');
      this.localStorageService.setInformation('currentUser', currentUser);

      //change users privacy status in the user db
    } else {
      privacyMode!.textContent = 'Public';
      description!.textContent = `When your account is public, your profile can be viewed by anyone who finds your account. This includes the people on both your followers and following list and the posts you've posted yourself or have been tagged in.`;
    
      let currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
      currentUser.private = false;

      this.localStorageService.clearInformation('currentUser');
      this.localStorageService.setInformation('currentUser', currentUser);

      //change users privacy status in the user db
    }
  }

  goToAccount(username: string) {
    this.routingService.navigateToAccount(username);
  }

  toggleActive() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const accountInfo = document.querySelector('.account-info-icon');
    accountInfo?.classList.toggle('active');
    const privacy = document.querySelector('.privacy-icon');
    privacy?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }

  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToLogin() {
    this.routingService.navigateToLogin();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
  }  
  navigateToSearchSeries() {
    this.routingService.navigateToSearchSeries();
  }
  navigateToMovies() {
    this.routingService.navigateToMovies();
  }
  navigateToShows() {
    this.routingService.navigateToShows();
  }
  navigateToSummary() {
    this.routingService.navigateToSummary();
  }
  navigateToAccount() {
    this.routingService.navigateToAccount(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
  navigateToPrivacy() {
    this.routingService.navigateToPrivacy();
  }
}
