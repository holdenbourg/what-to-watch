import { Component, OnInit, inject } from '@angular/core';
import { SearchedUserTemplateComponent } from '../searched-user-template/searched-user-template.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchedUserTemplateComponent],
  templateUrl: './search-users.component.html',
  styleUrl: './search-users.component.scss'
})
export class SearchUsersComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  public searchInput: string = '';
  public input: string = '';
  public searchedAccounts: RawAccountInformationModel[] = [];


  ngOnInit() {
    this.input = this.activatedRoute.snapshot.params['input'];

    if(this.input != undefined) {
      this.toggleSearchLabel(); 
      this.searchInput = this.input;
    
      this.searchedAccounts = [];
      this.onSearch(this.input);
    }

    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }


  onSearch(searchInput: string) {
    //clearing previous search
    this.searchedAccounts = [];

    let search: RawAccountInformationModel[] = [];
    let users: RawAccountInformationModel[] = this.localStorageService.getInformation('rawUsers');

    for(let i = 0; i < users.length; i++) {
      let currentUser: RawAccountInformationModel = users.at(i)!;

      if(currentUser.username.toLowerCase() == searchInput.toLowerCase()) search.push(currentUser);
    }

    const searchWarning = document.querySelector('.search-warning');

    if(search.length == 0) {
      searchWarning?.classList.toggle('active');
      setTimeout(() => {searchWarning?.classList.toggle('active');}, 3000);
    } else {
      this.routingService.navigateToSearchUsersWithInput(searchInput);
      this.input = searchInput;
            
      this.searchedAccounts = search;
    }
  }


  onAccountClicked(account: RawAccountInformationModel) {
    let isBlocked: boolean = false;

    this.currentUser.blocked.forEach((blockedUser) => {
      if(blockedUser.username == account.username) isBlocked = true;
    });

    if(account.username == this.currentUser.username) {
      //account is the current user
      this.routingService.navigateToAccountsPosts(this.currentUser.username);
      
    } else if(account.private == false) {
      //account is public

    } else if(account.private == true) {
      //account is private

    } else if(isBlocked) {
      //account is blocked

    }
  }

  /* OTHER SEARCH RIBBONS */
  toggleMoviesActive() {
    if(this.input == undefined) {
      this.routingService.navigateToSearchMovies();
    } else {
      this.routingService.navigateToSearchMoviesWithInput(this.input);
    }
  }
  toggleSeriesActive() {
    if(this.input == undefined) {
      this.routingService.navigateToSearchSeries();
    } else {
      this.routingService.navigateToSearchSeriesWithInput(this.input);
    }
  }
  toggleUsersActive() {
    if(this.input == undefined) {
      this.routingService.navigateToSearchUsers();
    } else {
      this.routingService.navigateToSearchUsersWithInput(this.input);
    }
  }


  /* TOGGLE SEARCH PROMPT */
  toggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(!(prompt?.classList.contains('active'))) prompt?.classList.toggle('active'); 
  }
  untoggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(prompt?.classList.contains('active') && this.searchInput.length == 0) prompt?.classList.toggle('active');
  }


  /* SIDEBAR OPEN/CLOSE */
  //closes/opens sidebar if screen width goes above/below 1275 pixels
  sidebarCloseOnResize() {  
    const themeClass = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    var width = window.innerWidth;

    if(width <= 1275 && themeClass?.classList.contains('active')) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
    if(width >= 1275 && !(themeClass?.classList.contains('active'))) {
      themeClass?.classList.toggle('active');
      container?.classList.toggle('active');  
    }
  }
  //shifts specific elements to the right when dashboard is opened
  toggleSidebarActive() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}
