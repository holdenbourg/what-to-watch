import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { RatedSeriesInformationService } from '../services/film-information/rated-series-information.service';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';
import { FormsModule } from '@angular/forms';
import { RatedSeriesTemplateComponent } from '../rated-series-template/rated-series-template.component';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule, FormsModule, RatedSeriesTemplateComponent],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.scss'
})
export class ShowsComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public ratedSeriesInformationService: RatedSeriesInformationService = inject(RatedSeriesInformationService);
  public username: string = this.userInformationService.username;

  public ratedSeries: RatedSeriesModel[] = [
    {
      title: 'Avatar',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      length: 7,
      pacing: 8,
      ending: 9,
      rating: 101,
      username: 'Holden',
      dateRated: 'December 26, 2024'
    },
    {
      title: 'Avatar 2',
      releaseDate: 'December 18, 2009',
      type: 'Movie',
      rated: 'PG-13',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      acting: 4,
      visuals: 5,
      story: 6,
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
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
      length: 7,
      pacing: 8,
      ending: 9,
      rating: 1010,
      username: 'Holden',
      dateRated: 'January 26, 2024'
    },
  ];

  public activeSeries?: RatedSeriesModel = this.ratedSeries.at(0);
  public activeSeriesClass: string = '.rated-film-0';

  public searchInput: string = '';


  ngOnInit() {
    this.toggleActive()
  }

  onEdit(input?: RatedSeriesModel) {
    this.ratedSeriesInformationService.filmDetails = input;
    this.routingService.navigateToEditSeries(input?.title);
  }
  onSearch() {

  }
  onRatedFilmClicked(title: string, rating: number) {
    for(let i = 0; i < this.ratedSeries.length; i++) {
      const currentRating = this.ratedSeries.at(i);

      if(currentRating?.title == title && currentRating?.rating == rating) {
        this.activeSeries = currentRating;
        this.activeSeriesClass = `.rated-film-${i}`
      }
    }
  }

  //turns the given date (18 Dec 2009) into (December 18, 2009)
  fixRelease(releaseDate?: string) {
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
  //turns 08 day into 8
  fixReleaseDay(releaseDate?: string) {
    if(releaseDate != undefined) {
      const index = releaseDate.indexOf(' ');

      let day = releaseDate.substring(index + 1, index + 3);
      let month = releaseDate.substring(0, index);
      let year = releaseDate.substring(index + 5); 

      if(day.charAt(0) == '0') {
        day = day.charAt(1);
      }

      return `${month} ${day}, ${year}`;
    }
    return;
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
