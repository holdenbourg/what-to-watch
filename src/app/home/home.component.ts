import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { ApiService } from '../services/api/api.service';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';
import { FormsModule } from '@angular/forms';
import { UpcomingFilmTemplateComponent } from '../upcoming-film-template/upcoming-film-template.component';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public apiService: ApiService = inject(ApiService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public username: string = this.localStorageService.getInformation('currentUser').username;
  public omdbReturn: ExtensiveSearchFilmModel[] = [];
  public mdbReturn: SeriesResponseModel[] = [];

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public searchInput: string = '';

  
  ngOnInit() {
    this.toggleActive();

    //sets information for upcoming films
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();
  }
  
  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
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
    this.routingService.navigateToAccount();
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
  }
}



