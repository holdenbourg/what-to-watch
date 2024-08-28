import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { SearchedFilmModel } from '../services/models/omdb-api/searched-film-model';
import { RoutingService } from '../services/routing/routing.service';
import { UserInputService } from '../services/user/user-input.service';
import { SearchedFilmTemplateComponent } from '../searched-film-template/searched-film-template.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-series',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchedFilmTemplateComponent],
  templateUrl: './search-series.component.html',
  styleUrl: './search-series.component.scss'
})
export class SearchSeriesComponent implements OnInit {
  public routingService: RoutingService = inject(RoutingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private apiService: ApiService = inject(ApiService);
  private userInputService: UserInputService = inject(UserInputService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');

  public searchInput: string = '';
  public input: string = '';
  public translatedShows: SearchedFilmModel[] = [];


  ngOnInit() {
    this.input = this.activatedRoute.snapshot.params['input'];

    if(this.input != undefined) {
      this.toggleSearchLabel(); 
      this.searchInput = this.input;
    
      this.translatedShows = [];
      this.translatedShows = this.apiService.search10Films(this.input, 'series')!;
    }

    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }


  onSearch() {
    //turns off the 'No Results' message
    const searchWarning = document.querySelector('.search-show-warning');
    if(searchWarning?.classList.contains('active')) searchWarning?.classList.toggle('active');

    //clearing previous search
    this.translatedShows = [];

    this.userInputService.userInput = this.searchInput;
    this.routingService.navigateToSearchSeriesWithInput(this.searchInput);

    this.input = this.searchInput;
    this.translatedShows = this.apiService.search10Films(this.searchInput, 'series')!;
  }

  onFilmClicked(imdbId: string) {
    this.routingService.navigateToSeriesInformation(imdbId);
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
