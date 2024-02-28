import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RatedMovieTemplateComponent } from '../rated-movie-template/rated-movie-template.component';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RatedMovieTemplateComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  public usersRatedMovies: RatedMovieModel[] = [];
  public activeMovie: RatedMovieModel = {
    poster: '',
    title: '',
    releaseDate: '',
    rated: '',
    runTime: 0,
    genres: [],
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

  public searchInput: string = '';

  ngOnInit() {        
    this.populateUsersRatedMovies();

    if(this.usersRatedMovies.length != 0) {
      this.activeMovie = this.usersRatedMovies.at(0)!;
    }

    this.sidebarCloseOnResize();
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

  //populate users ratings from the series database
  populateUsersRatedMovies() {
    let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');

    this.usersRatedMovies = ratedMovies.filter((movie) => movie.username == this.currentUser.username);
  }

  onEdit(input: RatedMovieModel) {
    this.localStorageService.clearInformation('currentEditMovie');
    this.localStorageService.setInformation('currentEditMovie', input);

    this.routingService.navigateToEditMovie();
  }
  onSearch() {

  }
  onRatedFilmClicked(title: string, rating: number) {
    for(let i = 0; i < this.usersRatedMovies.length; i++) {
      const currentRating = this.usersRatedMovies.at(i);

      if(currentRating?.title == title && currentRating?.rating == rating) {
        this.activeMovie = currentRating;
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

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const filmInformation = document.querySelector('.container');
    filmInformation?.classList.toggle('active');
  }
}
