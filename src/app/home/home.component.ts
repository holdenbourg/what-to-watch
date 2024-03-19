import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { ApiService } from '../services/api/api.service';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';
import { FormsModule } from '@angular/forms';
import { UpcomingFilmTemplateComponent } from '../upcoming-film-template/upcoming-film-template.component';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RawAccountInformationModel } from '../services/models/database-objects/raw-account-information-model';
import { AccountInformationModel } from '../services/models/database-objects/account-information-model';
import { FollowerModel } from '../services/models/database-objects/follower-model';
import { UserPostModel } from '../services/models/database-objects/user-post-model';
import { CommentModel } from '../services/models/database-objects/comment-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public apiService: ApiService = inject(ApiService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public currentUser: AccountInformationModel = this.localStorageService.getInformation('currentUser');
  
  public omdbReturn: ExtensiveSearchFilmModel[] = [];
  public mdbReturn: SeriesResponseModel[] = [];

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public searchInput: string = '';

  
  ngOnInit() {    
    //sets information for upcoming films
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();

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

  getTaggedAccounts(comment: string) {
    let taggedAccountsString: string = '';

    let atIndexes: number[] = [];
    let searchIndex: number = 0;
    let atIndex: number = comment.indexOf('@', searchIndex);

    let count = 0; 
    for (let i = 0; i < comment.length; i++) { 
      if (comment.charAt(i) === '@') { 
        count++; 
      } 
    } 

    for(let i = 0; i < count; i++) {
      atIndex = comment.indexOf('@', searchIndex);

      atIndexes.push(atIndex);
      searchIndex = atIndex + 1;
    }

    for(let i = 0; i < atIndexes.length; i++) {
      let firstBreak = comment.substring(atIndexes[i]);

      if(firstBreak.indexOf(' ') == -1) {
        let taggedAccount: string = firstBreak.substring(1, firstBreak.length);

        //check if the account exists in the users database
        if(taggedAccount.length != 0) {
          taggedAccountsString = taggedAccountsString + taggedAccount;
        }
      } else {
        let taggedAccount: string = firstBreak.substring(1, firstBreak.indexOf(' '));
        
        //check if the account exists in the users database
        if(taggedAccount.length != 0) {
          taggedAccountsString = taggedAccountsString + taggedAccount;
        }
      }

      if(i != atIndexes.length - 1) {
        taggedAccountsString = taggedAccountsString + ',';
      }
    }

    return taggedAccountsString;
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

  sortByDate(upcomingFilms: UpcomingFilmModel[]) {
    let filteredUpcomingFilms: UpcomingFilmModel[] = upcomingFilms.filter((upcomingFilm) => {
      let upcomingFilmDate: Date = new Date(upcomingFilm.release_date);
      let currentDate = new Date(new Date().toJSON().slice(0, 10));

      return upcomingFilmDate.getTime() >= currentDate.getTime();
    });
    
    filteredUpcomingFilms.sort((a: UpcomingFilmModel, b: UpcomingFilmModel) => {
      let aDate: Date = new Date(a.release_date);
      let bDate: Date = new Date(b.release_date);
      
      return aDate.getTime() - bDate.getTime();
    });

    return filteredUpcomingFilms;
  }

  toggleActive() {
    const themeClass = document.querySelector('.sidebar');
    themeClass?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}



