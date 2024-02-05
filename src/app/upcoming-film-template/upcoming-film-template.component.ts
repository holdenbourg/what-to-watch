import { Component, Input } from '@angular/core';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';

@Component({
  selector: 'app-upcoming-film-template',
  standalone: true,
  imports: [],
  templateUrl: './upcoming-film-template.component.html',
  styleUrl: './upcoming-film-template.component.scss'
})
export class UpcomingFilmTemplateComponent {
  public exampleUpcomingFilm: UpcomingFilmModel = {
    adult: 'false',
    backdrop_path: '"/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg"',
    genre_ids: [878, 12],
    id: '438631',
    original_language: 'en',
    original_title: 'Dune',
    overview: `Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.`,
    popularity: 149.513,
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    release_date: '2024-02-09',
    title: 'Dune',
    video: 'false',
    vote_average: 7.783,
    vote_count: 9938
  }

  @Input()
  public upcomingFilm: UpcomingFilmModel = {
    adult: '',
    backdrop_path: '',
    genre_ids: [],
    id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: '',
    vote_average: 0,
    vote_count: 0
  };


  fixPosterUrl(posterUrl: string) {
    return `https://image.tmdb.org/t/p/original${posterUrl}`;
  }

  //turns the given date (2024-02-09) into (December 18, 2009)
  fixRelease(releaseDate: string) {
    let day = releaseDate.substring(8,10);
    let month = releaseDate.substring(5,7);
    const year = releaseDate.substring(0,4);

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

    if(day.charAt(0) == '0') {
      day = day.charAt(1);
    }
    
    return `${month} ${day}, ${year}`
  }
}
