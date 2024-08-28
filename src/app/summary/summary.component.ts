import { Component, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { ApiService } from '../services/api/api.service';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';
import { RatedMovieStatisticsModel } from '../services/models/rated-movie-statistics-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { RatedSeriesStatisticsModel } from '../services/models/rated-series-statistics-model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private routingService: RoutingService = inject(RoutingService);
  public apiService: ApiService = inject(ApiService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  public highestRatedMovie?: RatedMovieModel = this.findBestRatedMovie();
  public highestRatedSeries?: RatedSeriesModel = this.findBestRatedSeries();

  public ratedMovieStatistics?: RatedMovieStatisticsModel = this.findRatedMovieStatistics();
  public ratedSeriesStatistics?: RatedSeriesStatisticsModel = this.findRatedSeriesStatistics();
  
  ngOnInit() {
    this.sidebarCloseOnResize();
    this.localStorageService.cleanTemporaryLocalStorages();
  }


  /* SUMMARY LOGIC */
  findBestRatedMovie() {
    let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
    let filteredMovies: RatedMovieModel[] = ratedMovies.filter((movie) => movie.username == this.currentUser.username);

    if(filteredMovies.length > 0) {
      filteredMovies.sort((a: RatedMovieModel, b: RatedMovieModel) => {
        return b.rating - a.rating;
      });

      return filteredMovies.at(0);
    } else {
      return;
    }
  }
  findBestRatedSeries() {
    let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
    let filteredSeries: RatedSeriesModel[] = ratedSeries.filter((series) => series.username == this.currentUser.username);

    if(filteredSeries.length > 0) {
      filteredSeries.sort((a: RatedSeriesModel, b: RatedSeriesModel) => {
        return b.rating - a.rating;
      });

      return filteredSeries.at(0);
    } else {
      return;
    }
  }

  findRatedMovieStatistics() {
    let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
    let filteredMovies: RatedMovieModel[] = ratedMovies.filter((movie) => movie.username == this.currentUser.username);

    if(filteredMovies.length > 0) {
      let ratedMovieStatistics: RatedMovieStatisticsModel = {
        numFilmsRated: filteredMovies.length,
        numMinutesWatched: 0,
        averageFilmRating: 0,
        favoriteFilmRating: '',
        favoriteGenre: '',
      };

      let averageFilmRating: number = 0;
      
      let moviesRatingMap = new Map<string, number>();
      let movieGenresMap = new Map<string, number>();

      for(let i = 0; i < filteredMovies.length; i++) {
        ratedMovieStatistics.numMinutesWatched = ratedMovieStatistics.numMinutesWatched + filteredMovies[i].runTime;
        averageFilmRating = averageFilmRating + filteredMovies[i].rating;

        if(filteredMovies[i].rated != 'N/A' && filteredMovies[i].rated != 'Not Rated') {
          if(moviesRatingMap.has(filteredMovies[i].rated)) {
            let numMoviesWithRating: number = moviesRatingMap.get(filteredMovies[i].rated)!;
  
            moviesRatingMap.set(filteredMovies[i].rated, numMoviesWithRating + 1);
          } else {
            moviesRatingMap.set(filteredMovies[i].rated, 1);
          }
        }

        filteredMovies[i].genres.forEach((genre) => {
          if(movieGenresMap.has(genre)) {
            let numMoviesWithGenre: number = movieGenresMap.get(genre)!;
  
            movieGenresMap.set(genre, numMoviesWithGenre + 1);
          } else {
            movieGenresMap.set(genre, 1);
          }
        });
      }

      let currentHighestRating: number = 0;
      let currentHighestRatingString: string = '';

      moviesRatingMap.forEach((value: number, key: string) => {
        if(value > currentHighestRating) {
          currentHighestRating = value;
          currentHighestRatingString = key;
        }
      });

      let currentHighestGenre: number = 0;
      let currentHighestGenreString: string = '';

      movieGenresMap.forEach((value: number, key: string) => {
        if(value > currentHighestGenre) {
          currentHighestGenre = value;
          currentHighestGenreString = key;
        }
      });

      ratedMovieStatistics.averageFilmRating = Number((averageFilmRating / filteredMovies.length).toFixed(1));
      ratedMovieStatistics.favoriteFilmRating = currentHighestRatingString;
      ratedMovieStatistics.favoriteGenre = currentHighestGenreString;
  
      return ratedMovieStatistics;
    } else {
      return;
    }
  }
  findRatedSeriesStatistics() {
    let ratedSeries: RatedSeriesModel[] = this.localStorageService.getInformation('ratedSeries');
    let filteredSeries: RatedSeriesModel[] = ratedSeries.filter((series) => series.username == this.currentUser.username);

    if(filteredSeries.length > 0) {
      let ratedSeriesStatistics: RatedSeriesStatisticsModel = {
        numFilmsRated: filteredSeries.length,
        numEpisodesWatched: 0,
        averageFilmRating: 0,
        favoriteFilmRating: '',
        favoriteGenre: '',
      };

      let averageFilmRating: number = 0;
      
      let seriesRatingMap = new Map<string, number>();
      let seriesGenresMap = new Map<string, number>();

      for(let i = 0; i < filteredSeries.length; i++) {
        ratedSeriesStatistics.numEpisodesWatched = ratedSeriesStatistics.numEpisodesWatched + filteredSeries[i].episodes;
        averageFilmRating = averageFilmRating + filteredSeries[i].rating;

        if(filteredSeries[i].rated != 'N/A' && filteredSeries[i].rated != 'Not Rated') {
          if(seriesRatingMap.has(filteredSeries[i].rated)) {
            let numMoviesWithRating: number = seriesRatingMap.get(filteredSeries[i].rated)!;
  
            seriesRatingMap.set(filteredSeries[i].rated, numMoviesWithRating + 1);
          } else {
            seriesRatingMap.set(filteredSeries[i].rated, 1);
          }
        }

        filteredSeries[i].genres.forEach((genre) => {
          if(seriesGenresMap.has(genre)) {
            let numMoviesWithGenre: number = seriesGenresMap.get(genre)!;
  
            seriesGenresMap.set(genre, numMoviesWithGenre + 1);
          } else {
            seriesGenresMap.set(genre, 1);
          }
        });
      }

      let currentHighestRating: number = 0;
      let currentHighestRatingString: string = '';

      seriesRatingMap.forEach((value: number, key: string) => {
        if(value > currentHighestRating) {
          currentHighestRating = value;
          currentHighestRatingString = key;
        }
      });

      let currentHighestGenre: number = 0;
      let currentHighestGenreString: string = '';

      seriesGenresMap.forEach((value: number, key: string) => {
        if(value > currentHighestGenre) {
          currentHighestGenre = value;
          currentHighestGenreString = key;
        }
      });      

      ratedSeriesStatistics.averageFilmRating = Number((averageFilmRating / filteredSeries.length).toFixed(1));
      ratedSeriesStatistics.favoriteFilmRating = currentHighestRatingString;
      ratedSeriesStatistics.favoriteGenre = currentHighestGenreString;
  
      return ratedSeriesStatistics;
    } else {
      return;
    }
  }


  /* FORMATTING */
  //turn runtime 150 to 2 HR 30 MIN
  fixRuntime(runtime: number) {
    let hours = Math.floor(runtime/60);
    let minutes = runtime - (hours * 60);

    if(hours == 0) return `${minutes} MIN`;
    else return `${hours} HR ${minutes} MIN`;
  }
  //turns 2009-12-18 into December 18, 2009
  fixReleaseDate(releaseDate?: string) {    
    if(releaseDate == '') {
      return '';
    } else {
      let day = releaseDate?.substring(8);
      if (day?.charAt(0) == '0') day = day.substring(1);

      let month = releaseDate?.substring(5,7);
      const year = releaseDate?.substring(0,4);
    
      switch(month) {
        case '01':
          month = 'January'
          break;
        case '02':
          month = 'February'
          break;
        case '03':
          month = 'March'
          break;
        case '04':
          month = 'April'
          break;
        case '05':
          month = 'May'
          break;
        case '06':
          month = 'June'
          break;
        case '07':
          month = 'July'
          break;
        case '08':
          month = 'August'
          break;
        case '09':
          month = 'September'
          break;
        case '10':
          month = 'October'
          break;
        case '11':
          month = 'November'
          break;
        case '12':
          month = 'December'
          break;
      }
        
      return `${month} ${day}, ${year}`
    }
  }
  
  
  /* SIDEBAR */
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
  //toggles sidebar open/close
  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }


  /* ROUTING */
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
