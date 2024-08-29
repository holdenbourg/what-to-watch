import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { SearchedFilmModel } from '../services/models/omdb-api/searched-film-model';
import { SearchedFilmTemplateComponent } from '../searched-film-template/searched-film-template.component';
import { ActivatedRoute } from '@angular/router';
import { UserInputService } from '../services/user/user-input.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { SearchedUserTemplateComponent } from '../searched-user-template/searched-user-template.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchedFilmTemplateComponent, SearchedUserTemplateComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent  implements OnInit {
  public routingService: RoutingService = inject(RoutingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private apiService: ApiService = inject(ApiService);
  private userInputService: UserInputService = inject(UserInputService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  public searchInput: string = '';
  public input: string = '';
  public translatedMovies: SearchedFilmModel[] = [];


  ngOnInit() {
    this.input = this.activatedRoute.snapshot.params['input'];

    if(this.input != undefined) {
      this.toggleSearchLabel(); 
      this.searchInput = this.input;
    
      this.translatedMovies = [];
      this.translatedMovies = this.apiService.search10Films(this.input, 'movie')!;
    }

    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }


  onSearch() {
    //turns off the 'No Results' message
    const searchWarning = document.querySelector('.search-warning');
    if(searchWarning?.classList.contains('active')) searchWarning?.classList.toggle('active');

    //clearing previous search
    this.translatedMovies = [];

    this.userInputService.userInput = this.searchInput;
    this.routingService.navigateToSearchMoviesWithInput(this.searchInput);

    this.input = this.searchInput;
    this.translatedMovies = this.apiService.search10Films(this.searchInput, 'movie')!;
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
