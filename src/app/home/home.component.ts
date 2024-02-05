import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { ApiService } from '../services/api/api.service';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';
import { FormsModule } from '@angular/forms';
import { UpcomingFilmTemplateComponent } from '../upcoming-film-template/upcoming-film-template.component';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public apiService: ApiService = inject(ApiService);
  public username: string = this.userInformationService.username;
  public omdbReturn: ExtensiveSearchFilmModel[] = [];
  public mdbReturn: SeriesResponseModel[] = [];

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public searchInput: string = '';

  
  ngOnInit() {
    this.toggleActive();
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();
    console.log(this.upcomingFilmList);
    this.omdbReturn = this.apiService.search1FilmOmdb('tt0499549');
    this.mdbReturn = this.apiService.search1SeriesMdb('tt0499549');
    console.log(this.omdbReturn);
    console.log(this.mdbReturn);
  }
  
  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToNews() {
    this.routingService.navigateToNews();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
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

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
  }
}



