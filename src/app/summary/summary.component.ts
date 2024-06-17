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

      //ratings counter
      let numG: number = 0;
      let numPG: number = 0;
      let numPG13: number = 0;
      let numR: number = 0;
      let numNC17: number = 0;

      //genres counter
      let numRomance: number = 0;
      let numDrama: number = 0;
      let numAction: number = 0;
      let numComedy: number = 0;
      let numFantasy: number = 0;
      let numAdventure: number = 0;
      let numAnimation: number = 0;
      let numSciFi: number = 0;
      let numCrime: number = 0;
      let numHorror: number = 0;
      let numMystery: number = 0;
      let numThriller: number = 0;
      let numDocumentary: number = 0;
      let numHistory: number = 0;
      let numSport: number = 0;
      let numFamily: number = 0;
      let numShort: number = 0;
      let numBiography: number = 0;
      
      for(let i = 0; i < filteredMovies.length; i++) {
        ratedMovieStatistics.numMinutesWatched = ratedMovieStatistics.numMinutesWatched + filteredMovies[i].runTime;
        averageFilmRating = averageFilmRating + filteredMovies[i].rating;

        if(filteredMovies[i].rated == 'G') {
          numG++;
        } else if(filteredMovies[i].rated == 'PG') {
          numPG++;
        } else if(filteredMovies[i].rated == 'PG-13') {
          numPG13++;
        } else if(filteredMovies[i].rated == 'R') {
          numR++;
        } else if(filteredMovies[i].rated == 'NC-17') {
          numNC17++;
        }

        filteredMovies[i].genres.forEach((genre) => {
          if(genre == 'Romance') {
            numRomance++;
          } else if(genre == 'Drama') {
            numDrama++;
          } else if(genre == 'Action') {
            numAction++;
          } else if(genre == 'Comedy') {
            numComedy++;
          } else if(genre == 'Fantasy') {
            numFantasy++;
          } else if(genre == 'Adventure') {
            numAdventure++;
          } else if(genre == 'Animation') {
            numAnimation++;
          } else if(genre == 'Sci-Fi') {
            numSciFi++;
          } else if(genre == 'Crime') {
            numCrime++;
          } else if(genre == 'Horror') {
            numHorror++;
          } else if(genre == 'Mystery') {
            numMystery++;
          } else if(genre == 'Thriller') {
            numThriller++;
          } else if(genre == 'Documentary') {
            numDocumentary++;
          } else if(genre == 'History') {
            numHistory++;
          } else if(genre == 'Sport') {
            numSport++;
          } else if(genre == 'Family') {
            numFamily++;
          } else if(genre == 'Short') {
            numShort++;
          } else if(genre == 'Biography') {
            numBiography++;
          }
        });
      }

      let ratingsHashmap = new Map<string, number>();
      ratingsHashmap.set('G', numG);
      ratingsHashmap.set('PG', numPG);
      ratingsHashmap.set('PG-13', numPG13);
      ratingsHashmap.set('R', numR);
      ratingsHashmap.set('NC-17', numNC17);

      let currentHighestRating: number = 0;
      let currentHighestRatingString: string = '';

      ratingsHashmap.forEach((value: number, key: string) => {
        if(value > currentHighestRating) {
          currentHighestRating = value;
          currentHighestRatingString = key;
        }
      });

      let genresHashmap = new Map<string, number>();
      genresHashmap.set('Romance', numRomance);
      genresHashmap.set('Drama', numDrama);
      genresHashmap.set('Action', numAction);
      genresHashmap.set('Comedy', numComedy);
      genresHashmap.set('Fantasy', numFantasy);
      genresHashmap.set('Adventure', numAdventure);
      genresHashmap.set('Animation', numAnimation);
      genresHashmap.set('Sci-Fi', numSciFi);
      genresHashmap.set('Crime', numCrime);
      genresHashmap.set('Horror', numHorror);
      genresHashmap.set('Mystery', numMystery);
      genresHashmap.set('Thriller', numThriller);
      genresHashmap.set('Documentary', numDocumentary);
      genresHashmap.set('History', numHistory);
      genresHashmap.set('Sport', numSport);
      genresHashmap.set('Family', numFamily);
      genresHashmap.set('Sport', numShort);
      genresHashmap.set('Biography', numBiography);

      let currentHighestGenre: number = 0;
      let currentHighestGenreString: string = '';

      genresHashmap.forEach((value: number, key: string) => {
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
      let ratedSeriestatistics: RatedSeriesStatisticsModel = {
        numFilmsRated: filteredSeries.length,
        numEpisodesWatched: 0,
        averageFilmRating: 0,
        favoriteFilmRating: '',
        favoriteGenre: '',
      };

      let averageFilmRating: number = 0;

      //ratings counter
      let numTVY: number = 0;
      let numTVY7: number = 0;
      let numTVY7FV: number = 0;
      let numTVG: number = 0;
      let numTVPG: number = 0;
      let numTV14: number = 0;
      let numTVMA: number = 0;

      //genres counter
      let numRomance: number = 0;
      let numDrama: number = 0;
      let numAction: number = 0;
      let numComedy: number = 0;
      let numFantasy: number = 0;
      let numAdventure: number = 0;
      let numAnimation: number = 0;
      let numSciFi: number = 0;
      let numCrime: number = 0;
      let numHorror: number = 0;
      let numMystery: number = 0;
      let numThriller: number = 0;
      let numDocumentary: number = 0;
      let numHistory: number = 0;
      let numSport: number = 0;
      let numFamily: number = 0;
      let numShort: number = 0;
      let numBiography: number = 0;
      
      for(let i = 0; i < filteredSeries.length; i++) {
        ratedSeriestatistics.numEpisodesWatched = ratedSeriestatistics.numEpisodesWatched + filteredSeries[i].episodes;
        averageFilmRating = averageFilmRating + filteredSeries[i].rating;

        if(filteredSeries[i].rated == 'TV-Y') {
          numTVY++;
        } else if(filteredSeries[i].rated == 'TV-Y7') {
          numTVY7++;
        } else if(filteredSeries[i].rated == 'TV-Y7-FV') {
          numTVY7FV++;
        } else if(filteredSeries[i].rated == 'TV-G') {
          numTVG++;
        } else if(filteredSeries[i].rated == 'TV-PG') {
          numTVPG++;
        } else if(filteredSeries[i].rated == 'TV-14') {
          numTV14++;
        } else if(filteredSeries[i].rated == 'TV-MA') {
          numTVMA++;
        }

        filteredSeries[i].genres.forEach((genre) => {
          if(genre == 'Romance') {
            numRomance++;
          } else if(genre == 'Drama') {
            numDrama++;
          } else if(genre == 'Action') {
            numAction++;
          } else if(genre == 'Comedy') {
            numComedy++;
          } else if(genre == 'Fantasy') {
            numFantasy++;
          } else if(genre == 'Adventure') {
            numAdventure++;
          } else if(genre == 'Animation') {
            numAnimation++;
          } else if(genre == 'Sci-Fi') {
            numSciFi++;
          } else if(genre == 'Crime') {
            numCrime++;
          } else if(genre == 'Horror') {
            numHorror++;
          } else if(genre == 'Mystery') {
            numMystery++;
          } else if(genre == 'Thriller') {
            numThriller++;
          } else if(genre == 'Documentary') {
            numDocumentary++;
          } else if(genre == 'History') {
            numHistory++;
          } else if(genre == 'Sport') {
            numSport++;
          } else if(genre == 'Family') {
            numFamily++;
          } else if(genre == 'Short') {
            numShort++;
          } else if(genre == 'Biography') {
            numBiography++;
          }
        });
      }

      let ratingsHashmap = new Map<string, number>();
      ratingsHashmap.set('TV-Y', numTVY);
      ratingsHashmap.set('TV-Y7', numTVY7);
      ratingsHashmap.set('TV-Y7-FV', numTVY7FV);
      ratingsHashmap.set('TV-G', numTVG);
      ratingsHashmap.set('TV-PG', numTVPG);
      ratingsHashmap.set('TV-14', numTV14);
      ratingsHashmap.set('TV-MA', numTVMA);

      let currentHighestRating: number = 0;
      let currentHighestRatingString: string = '';

      ratingsHashmap.forEach((value: number, key: string) => {
        if(value > currentHighestRating) {
          currentHighestRating = value;
          currentHighestRatingString = key;
        }
      });

      let genresHashmap = new Map<string, number>();
      genresHashmap.set('Romance', numRomance);
      genresHashmap.set('Drama', numDrama);
      genresHashmap.set('Action', numAction);
      genresHashmap.set('Comedy', numComedy);
      genresHashmap.set('Fantasy', numFantasy);
      genresHashmap.set('Adventure', numAdventure);
      genresHashmap.set('Animation', numAnimation);
      genresHashmap.set('Sci-Fi', numSciFi);
      genresHashmap.set('Crime', numCrime);
      genresHashmap.set('Horror', numHorror);
      genresHashmap.set('Mystery', numMystery);
      genresHashmap.set('Thriller', numThriller);
      genresHashmap.set('Documentary', numDocumentary);
      genresHashmap.set('History', numHistory);
      genresHashmap.set('Sport', numSport);
      genresHashmap.set('Family', numFamily);
      genresHashmap.set('Sport', numShort);
      genresHashmap.set('Biography', numBiography);

      let currentHighestGenre: number = 0;
      let currentHighestGenreString: string = '';

      genresHashmap.forEach((value: number, key: string) => {
        if(value > currentHighestGenre) {
          currentHighestGenre = value;
          currentHighestGenreString = key;
        }
      });

      ratedSeriestatistics.averageFilmRating = Number((averageFilmRating / filteredSeries.length).toFixed(1));
      ratedSeriestatistics.favoriteFilmRating = currentHighestRatingString;
      ratedSeriestatistics.favoriteGenre = currentHighestGenreString;
  
      return ratedSeriestatistics;
    } else {
      return;
    }
  }
  //turn runtime 150 to 2 HR 30 MIN
  fixRuntime(runtime: number) {
    let hours = Math.floor(runtime/60);
    let minutes = runtime - (hours * 60);

    if(hours == 0) return `${minutes} MIN`;
    else return `${hours} HR ${minutes} MIN`;
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
  navigateToAccountsPosts() {
    this.routingService.navigateToAccountsPosts(this.currentUser.username);
  }
  navigateToAccountsTagged() {
    this.routingService.navigateToAccountsTagged(this.currentUser.username);
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
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

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}
