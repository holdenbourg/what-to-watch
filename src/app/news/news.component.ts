import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpcomingFilmTemplateComponent } from '../upcoming-film-template/upcoming-film-template.component';
import { RoutingService } from '../services/routing/routing.service';
import { UpcomingFilmModel } from '../services/models/upcoming-films/upcoming-film-model';
import { UserInformationService } from '../services/user/user-information.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, UpcomingFilmTemplateComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  public apiService: ApiService = inject(ApiService);
  public username: string = this.userInformationService.username;

  public upcomingFilmList: UpcomingFilmModel[] = [];
  public searchInput: string = '';

  ngOnInit() {
    this.toggleActive();
    this.upcomingFilmList = this.apiService.searchUpcomingFilms();
    console.log(this.upcomingFilmList);
  }
  
  navigateToHome() {
    this.routingService.navigateToHome();
  }
  navigateToSearchMovies() {
    this.routingService.navigateToSearchMovies();
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
  }
}
