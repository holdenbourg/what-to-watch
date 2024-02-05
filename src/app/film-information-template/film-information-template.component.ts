import { Component, Input, OnInit, inject } from '@angular/core';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { CommonModule } from '@angular/common';
import { RoutingService } from '../services/routing/routing.service';
import { MovieResponseModel } from '../services/models/mdb-list-api/movie-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeriesInformationTemplateComponent } from '../series-information-template/series-information-template.component';
import { MovieInformationTemplateComponent } from '../movie-information-template/movie-information-template.component';

@Component({
  selector: 'app-film-information-template',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            SeriesInformationTemplateComponent, 
            MovieInformationTemplateComponent],
  templateUrl: './film-information-template.component.html',
  styleUrl: './film-information-template.component.scss'
})
export class FilmInformationTemplateComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private routingService: RoutingService = inject(RoutingService);
  @Input()
  omdbFilmDetails: ExtensiveSearchFilmModel = {
    Title: '',
    Year: 0,
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Ratings: [],
    Metascore: 0,
    imdbRating: 0,
    imdbVotes: 0,
    imdbID: '',
    Type: '',
    DVD: '',
    BoxOffice: '',
    Production: '',
    Website: '',
    Response: ''
  };

  mdbSeriesResult: SeriesResponseModel[] = [];
  mdbMovieResult: MovieResponseModel[] = [];

  filmType: string = '';
  imdbId: string = '';


  ngOnInit() {
    //sets the type/imdbId for the look up from the url parameter
    this.filmType = this.activatedRoute.snapshot.params['type'];
    this.imdbId = this.activatedRoute.snapshot.params['imdbId'];

    if(this.filmType == 'movie') {
      this.mdbMovieResult = this.apiService.search1MovieMdb(this.imdbId);
      console.log("movie: " + this.mdbMovieResult);
    } else {
      this.mdbSeriesResult = this.apiService.search1SeriesMdb(this.imdbId);
      console.log("series: " + this.mdbSeriesResult);
    }
  }

  //if the film is a movie route to rate-movie, else rate-series
  onRateThisFilm() {
    if(this.omdbFilmDetails.Type === "movie") {
      this.routingService.navigateToRateMovie(this.omdbFilmDetails.imdbID);
    } else if(this.omdbFilmDetails.Type === "series"){
      this.routingService.navigateToRateSeries(this.omdbFilmDetails.imdbID);
    }
  }

  //turns the given date (18 Dec 2009) into (December 18, 2009)
  fixRelease(releaseDate: string) {
    const day = releaseDate.substring(0,2);
    let month = releaseDate.substring(3,6);
    const year = releaseDate.substring(7);

    switch(month) {
      case 'Jan':
        month = 'January'
        break;
      case 'Feb':
        month = 'February'
        break;
      case 'Mar':
        month = 'March'
        break;
      case 'Apr':
        month = 'April'
        break;
      case 'May':
        month = 'May'
        break;
      case 'Jun':
        month = 'June'
        break;
      case 'Jul':
        month = 'July'
        break;
      case 'Aug':
        month = 'August'
        break;
      case 'Sep':
        month = 'September'
        break;
      case 'Oct':
        month = 'October'
        break;
      case 'Nov':
        month = 'November'
        break;
      case 'Dec':
        month = 'December'
        break;
    }
    
    return `${month} ${day}, ${year}`;
  }

  //if director and writer are same person change info to Director/Writer
  checkDirectorWriterForDirector(director: string, writer: string) {
    if(director == writer) {
      return `Director/Writer: ${director}`;
    } else {
      return `Director: ${director}`;
    }
  }
  checkDirectorWriterForWriter(director: string, writer: string) {
    if(director == writer) {
      return '';
    } else {
      return `Writer: ${writer}`
    }
  }

  //check if any of the 3 ratings are empty if so put N/A
  checkIfRatingsEmpty(rating?: string) {
    if(rating != undefined && rating.length > 1) {
      return rating;
    } else {
      return 'N/A';
    }
  }

  //changes film type from movie to Movie
  fixFilmType(filmType: string) {
    return filmType.charAt(0).toUpperCase() + filmType.slice(1).toLowerCase();
  }

  fixBoxOffice(filmType: string, boxOffice: string) {
    if(filmType == 'movie') {
      return `Box Office: ${boxOffice}`;
    } else {
      return '';
    }
  }

  //if there is no poster give "no image available" poster
  fixNoPoster(poster: string) {
    if(poster == 'N/A') {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    } else {
      return poster;
    }
  }
}
