import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RatedMovieTemplateComponent } from '../rated-movie-template/rated-movie-template.component';
import { FormsModule } from '@angular/forms';
import { RatedMovieInformationService } from '../services/film-information/rated-movie-information.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RatedMovieTemplateComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public ratedMovieInformationService: RatedMovieInformationService = inject(RatedMovieInformationService);
  public username: string = this.userInformationService.username;

  /*public ratedMovies: RatedMovieModel[] = [
    {
      title: 'Avatar',
      releaseDate: 'December 08, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 101,
      username: 'Holden',
      dateRated: 'December 06, 2024'
    },
    {
      title: 'Avatar 2',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BYjk4ZDAxN2MtYjhlNy00MzJhLWI1MGYtYjY5ZGJlY2YwMzNlXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 102,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 3',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 103,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 4',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 104,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 5',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 105,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 6',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 106,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 7',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 107,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 8',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 108,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 9',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 109,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
    {
      title: 'Avatar 10',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      climax: 7,
      pacing: 8,
      ending: 9,
      rating: 1010,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
  ];
 */
  
  public ratedMovies: RatedMovieModel[] = [];
  public activeMovie: RatedMovieModel = {
    title: '',
    releaseDate: '',
    type: '',
    rated: '',
    poster: '',
    acting: 0,
    visuals: 0,
    story: 0,
    climax: 0,
    pacing: 0,
    ending: 0,
    rating: 0,
    username: '',
    dateRated: ''
  };
  public activeMovieClass: string = '';

  public searchInput: string = '';

  ngOnInit() {
    this.toggleActive()
        
    if(this.ratedMovies.length != 0) {
      this.activeMovie = this.ratedMovies.at(0)!;
      this.activeMovieClass = '.rated-film-0';
    }
  }

  onEdit(input?: RatedMovieModel) {
    this.ratedMovieInformationService.filmDetails = input;
    this.routingService.navigateToEditMovie(input?.title);
  }
  onSearch() {

  }
  onRatedFilmClicked(title: string, rating: number) {
    for(let i = 0; i < this.ratedMovies.length; i++) {
      const currentRating = this.ratedMovies.at(i);

      if(currentRating?.title == title && currentRating?.rating == rating) {
        this.activeMovie = currentRating;
        this.activeMovieClass = `.rated-film-${i}`
      }
    }
  }

  //turns the given date (18 Dec 2009) into (December 18, 2009)
  fixRelease(releaseDate?: string) {
    if(releaseDate == '') {
      return '';
    } else {
      const day = releaseDate?.substring(0,2);
      let month = releaseDate?.substring(3,6);
      const year = releaseDate?.substring(7);
    
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
  }
  //turns 08 day into 8
  fixReleaseDay(releaseDate?: string) {
    if(releaseDate != undefined && releaseDate != '') {
      const index = releaseDate.indexOf(' ');

      let day = releaseDate.substring(index + 1, index + 3);
      let month = releaseDate.substring(0, index);
      let year = releaseDate.substring(index + 5); 

      if(day.charAt(0) == '0') {
        day = day.charAt(1);
      }

      return `${month} ${day}, ${year}`;
    }
    return '';
  }
  //turns the title to lowercase for searchbar
  toLowerCase(input: string) {
    return input.toLowerCase(); 
  }

  navigateToHome() {
    this.routingService.navigateToHome();
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
    const filmInformation = document.querySelector('.container');
    filmInformation?.classList.toggle('active');
  }
}
