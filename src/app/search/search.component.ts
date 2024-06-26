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
import { FollowerModel } from '../services/models/database-objects/follower-model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchedFilmTemplateComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private apiService: ApiService = inject(ApiService);
  private userInputService: UserInputService = inject(UserInputService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  public currentActiveSearchType: string = '.movies';
  public searchInput: string = '';
  public input: string = '';
  public type: string = ''
  public translatedMovies: SearchedFilmModel[] = [];

  public searchedUsers: any[] = []; //set up later


  ngOnInit() {
    //sets the search type/current active search type
    this.type = this.activatedRoute.snapshot.params['type'];
    this.currentActiveSearchType = '.' + this.type;
    
    if(this.type == 'movies') {
      const inputBoxMovies = document.querySelector('.movies');
      inputBoxMovies?.classList.toggle('active');
    } else {
      const inputBoxSeries = document.querySelector('.series');
      inputBoxSeries?.classList.toggle('active');
    }

    if (this.input.length < 1) {
      this.input = this.activatedRoute.snapshot.params['input'];
    }

    if (this.input != undefined && this.input.length > 1 && this.type == 'movies') {
      this.translatedMovies = [];
      this.translatedMovies = this.apiService.search10Films(this.input, 'movie');
    } else if (this.input != undefined && this.input.length > 1 && this.type == 'series') {
      this.translatedMovies = [];
      this.translatedMovies = this.apiService.search10Films(this.input, 'series');
    }

    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }

  onSearch() {
    //clearing previous search
    this.translatedMovies = [];

    //if movies is selected search movies, else search shows
    if(this.type == 'movies') {
      this.userInputService.userInput = this.searchInput;
      this.routingService.navigateToSearchMoviesWithInput(this.searchInput);
      this.translatedMovies = this.apiService.search10Films(this.searchInput, 'movie');
    } else if (this.type == 'series') {
      this.userInputService.userInput = this.searchInput;
      this.routingService.navigateToSearchSeriesWithInput(this.searchInput);
      this.translatedMovies = this.apiService.search10Films(this.searchInput, 'series');
    } else {
      
    }
  }

  //if type is 'movie' route to rate-movie, else route to rate-series with film information
  onFilmClicked(type: string, imdbId: string) {
    if(type == 'movie') {
      this.routingService.navigateToMovieInformation(imdbId);
    } else if(type == 'series') {
      this.routingService.navigateToSeriesInformation(imdbId);
    }
  }

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

  toggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(!(prompt?.classList.contains('active'))) prompt?.classList.toggle('active'); 
  }
  untoggleSearchLabel() {
    const prompt = document.querySelector('.prompt');

    if(prompt?.classList.contains('active') && this.searchInput.length == 0) prompt?.classList.toggle('active');
  }

  toggleMoviesActive() {
    const activeClass = document.querySelector(this.currentActiveSearchType);
    activeClass?.classList.toggle('active');

    this.currentActiveSearchType = '.movies';

    const movies = document.querySelector('.movies');
    movies?.classList.toggle('active');

    if(this.searchInput != '') {
      this.translatedMovies = [];
      this.routingService.navigateToSearchMoviesWithInput(this.searchInput);
      this.translatedMovies = this.apiService.search10Films(this.searchInput, 'movie');
    } else if(this.input != undefined) {
      this.translatedMovies = [];
      this.routingService.navigateToSearchMoviesWithInput(this.input);
      this.translatedMovies = this.apiService.search10Films(this.input, 'movie');
    } else {
      this.routingService.navigateToSearchMovies();
    }
  }
  toggleSeriesActive() {
    const activeClass = document.querySelector(this.currentActiveSearchType);
    activeClass?.classList.toggle('active');

    this.currentActiveSearchType = '.series';

    const series = document.querySelector('.series');
    series?.classList.toggle('active');

    if(this.searchInput != '') {
      this.translatedMovies = [];
      this.routingService.navigateToSearchSeriesWithInput(this.searchInput);
      this.translatedMovies = this.apiService.search10Films(this.searchInput, 'series');
    } else if(this.input != undefined) {
      this.translatedMovies = [];
      this.routingService.navigateToSearchSeriesWithInput(this.input);
      this.translatedMovies = this.apiService.search10Films(this.input, 'series');
    } else {
      this.routingService.navigateToSearchSeries();
    }
  }
  toggleUsersActive() {
    const activeClass = document.querySelector(this.currentActiveSearchType);
    activeClass?.classList.toggle('active');

    this.currentActiveSearchType = '.users';

    const users = document.querySelector('.users');
    users?.classList.toggle('active');

    if(this.searchInput != '') {
      this.translatedMovies = [];
      this.routingService.navigateToSearchUsersWithInput(this.searchInput);
      //search the database for users close to the searched name
    } else if(this.input != undefined) {
      this.translatedMovies = [];
      this.routingService.navigateToSearchUsersWithInput(this.input);
      //search the database for users close to the searched name
    } else {
      this.routingService.navigateToSearchUsers();
    }
  }

  //controls the routing for the dashboard
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
}
