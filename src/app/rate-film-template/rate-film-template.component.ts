import { Component, Input } from '@angular/core';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';

@Component({
  selector: 'app-rate-film-template',
  standalone: true,
  imports: [],
  templateUrl: './rate-film-template.component.html',
  styleUrl: './rate-film-template.component.scss'
})
export class RateFilmTemplateComponent {
  @Input()
  filmDetails: ExtensiveSearchFilmModel = {
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
      
    return `${month} ${day}, ${year}`
  }
  
  //changes film type from movie to Movie
  fixFilmType(filmType: string) {
    return filmType.charAt(0).toUpperCase() + filmType.slice(1).toLowerCase();
  }
}
