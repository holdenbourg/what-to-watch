import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { UserInformationService } from '../services/user/user-information.service';
import { RegisterModel } from '../services/models/login-register/register-model';
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent  implements OnInit {
  private routingService: RoutingService = inject(RoutingService);
  public userInformationService: UserInformationService = inject(UserInformationService);
  
  public username: string = this.userInformationService.username;


  ngOnInit() {
    this.toggleActive()
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
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
  }
}
