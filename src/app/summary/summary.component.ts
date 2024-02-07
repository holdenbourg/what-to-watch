import { Component, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { ApiService } from '../services/api/api.service';
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';
import { RatedFilmStatisticsModel } from '../services/models/rated-films-statistics-model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public apiService: ApiService = inject(ApiService);
  public username: string = this.userInformationService.username;

  public highestRatedMovie: RatedMovieModel = {
    title: 'Avatar',
    releaseDate: 'December 18, 2009',
    type: 'Movie',
    rated: 'PG-13',
    poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    acting: 10,
    visuals: 10,
    story: 10,
    pacing: 10,
    climax: 10,
    ending: 10,
    rating: 10,
    username: 'Holden',
    dateRated: 'January 26, 2024'
  }
  public highestRatedSeries: RatedSeriesModel = {
    title: 'Avatar: The Way of Water',
    releaseDate: 'December 16, 2022',
    type: 'Movie',
    rated: 'PG-13',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
    acting: 10,
    visuals: 10,
    story: 10,
    pacing: 10,
    length: 10,
    ending: 10,
    rating: 10,
    username: 'Holden',
    dateRated: 'January 26, 2024'
  }

  public ratedMovieStatistics: RatedFilmStatisticsModel = {
    numFilmsRated: 65,
    averageFilmRating: 8.7,
    favoriteFilmRating: 'PG-13',
    favoriteGenre: 'Fantasy'
  }
  public ratedSeriesStatistics: RatedFilmStatisticsModel = {
    numFilmsRated: 34,
    averageFilmRating: 8.9,
    favoriteFilmRating: 'TV-MA',
    favoriteGenre: 'Action'
  }
  
  ngOnInit() {
    this.toggleActive();
  }
  
  navigateToHome() {
    this.routingService.navigateToHome();
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
  navigateToNews() {
    this.routingService.navigateToNews();
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
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}