import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';
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
    postId: '',
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

    this.localStorageService.clearInformation('currentEditMovie');

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

  //populate users ratings from the movies database
  populateUsersRatedMovies() {
    let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
    let filteredMovies: RatedMovieModel[] = ratedMovies.filter((movie) => movie.username == this.currentUser.username);

    this.usersRatedMovies = filteredMovies.sort((a: RatedMovieModel, b: RatedMovieModel) => {
      return b.rating - a.rating;
    });
  }

  onDelete(input: RatedMovieModel) {
    //delete rating from database
    let ratedMovies: RatedMovieModel[] = this.localStorageService.getInformation('ratedMovies');
    let returnRatedMovies: RatedMovieModel[] = [];

    for(let i = 0; i < ratedMovies.length; i++) {
      if(!(ratedMovies[i].title === input.title && ratedMovies[i].username === input.username)) {
        returnRatedMovies.push(ratedMovies[i]);
      }
    }

    this.localStorageService.clearInformation('ratedMovies');
    this.localStorageService.setInformation('ratedMovies', returnRatedMovies);

    window.location.reload();
  }
  onEdit(input: RatedMovieModel) {
    this.localStorageService.clearInformation('currentEditMovie');
    this.localStorageService.setInformation('currentEditMovie', input);

    this.routingService.navigateToEditMovie();
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
          month = '01'
          break;
        case 'Feb':
          month = '02'
          break;
        case 'Mar':
          month = '03'
          break;
        case 'Apr':
          month = '04'
          break;
        case 'May':
          month = '05'
          break;
        case 'Jun':
          month = '06'
          break;
        case 'Jul':
          month = '07'
          break;
        case 'Aug':
          month = '08'
          break;
        case 'Sep':
          month = '09'
          break;
        case 'Oct':
          month = '10'
          break;
        case 'Nov':
          month = '11'
          break;
        case 'Dec':
          month = '12'
          break;
      }
        
      return `${year}-${month}-${day}`
    }
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
  
  //turn runtime 150 to 2 HR 30 MIN
  fixRuntime(runtime: number) {
    let hours = Math.floor(runtime/60);
    let minutes = runtime - (hours * 60);

    return `${hours} HR ${minutes} MIN`
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
