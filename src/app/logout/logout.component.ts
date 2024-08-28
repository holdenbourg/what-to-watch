import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { BlockedAccountTemplateComponent } from '../blocked-account-template/blocked-account-template.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, BlockedAccountTemplateComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  public routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  

  ngOnInit() {

  }


  /* BUTTON LOGIC */
  onYes() {
    this.localStorageService.clearInformation('currentUser');

    if(this.localStorageService.getInformation('rememberMe') == true) this.localStorageService.setInformation('rememberMe', false);
    
    this.routingService.navigateToLogin();
  }
  onNo() {
    this.routingService.navigateToHome();
  }


  /* ROUTING */
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
  navigateToAccountsPosts() {
    this.routingService.navigateToAccountsPosts(this.currentUser.username);
  }
  navigateToAccountsTagged() {
    this.routingService.navigateToAccountsTagged(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
  navigateToPrivacy() {
    this.routingService.navigateToPrivacy();
  }
  navigateToLogout() {
    this.routingService.navigateToLogout();
  }
}
