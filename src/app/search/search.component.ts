import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { SearchedFilmModel } from '../services/models/omdb-api/searched-film-model';
import { SearchedFilmTemplateComponent } from '../searched-film-template/searched-film-template.component';
import { ActivatedRoute } from '@angular/router';
import { UserInputService } from '../services/user/user-input.service';
import { UserInformationService } from '../services/user/user-information.service';
import { FilmInformationService } from '../services/film-information/film-information.service';

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
  private userInformationService: UserInformationService = inject(UserInformationService);
  private filmInformationService: FilmInformationService = inject(FilmInformationService);

  public currentActiveSearchType: string = '.movies';
  public searchInput: string = '';
  public input: string = '';
  public type: string = ''
  public username: string = this.userInformationService.username;
  public translatedMovies: SearchedFilmModel[] = [];


  ngOnInit() {
    this.toggleSidebarActive()

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
    this.routingService.navigateToFilmInformation(type, imdbId);
  }

  //shifts specific elements to the right when dashboard is opened
  toggleSidebarActive() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
  toggleSearchLabel() {
    const searchLabel = document.querySelector('.prompt');

    if(!(this.searchInput.length > 0) && !searchLabel?.classList.contains('active')) {
      searchLabel?.classList.toggle('active');
    }
  }

  //only toggles active if it's already inactive
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

  //only toggles active if it's already inactive
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
  navigateToNews() {
    this.routingService.navigateToNews();
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
    this.routingService.navigateToMovies(this.username);
  }
  navigateToShows() {
    this.routingService.navigateToShows(this.username);
  }
  navigateToSummary() {
    this.routingService.navigateToSummary(this.username);
  }
  navigateToAccount() {
    this.routingService.navigateToAccount(this.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
}
