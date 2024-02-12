import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingService } from '../services/routing/routing.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public username: string = this.localStorageService.getInformation('currentUser').username;

  ngOnInit() {
    this.toggleActive();
  }

  OnSwitchPrivacy() {
    //this.publicPrivate = !this.publicPrivate;
    const privacyMode = document.querySelector('.privacy-mode');
    privacyMode?.classList.toggle('active');
    const description = document.querySelector('.description');
    description?.classList.toggle('active');

    if(privacyMode?.classList.contains('active')) {
      privacyMode!.textContent = 'Private';
      description!.textContent = `When your account is private, only the followers you've accepted can see your profile. This means someone you haven't approved won't be able to see any of your posts, any of the posts you've been tagged in, and wont be able to see the people on either you followers or following list.`;
    } else {
      privacyMode!.textContent = 'Public';
      description!.textContent = `When your account is public, your profile can be viewed by anyone who finds your account. This includes the people on both your followers and following list and the posts you've posted yourself or have been tagged in.`;
    }
  }

  toggleActive() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const accountInfo = document.querySelector('.account-info-icon');
    accountInfo?.classList.toggle('active');
    const privacy = document.querySelector('.privacy-icon');
    privacy?.classList.toggle('active');
    const container = document.querySelector('.container');
    container?.classList.toggle('active');
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
  navigateToNews() {
    this.routingService.navigateToNews();
  }
  navigateToSummary() {
    this.routingService.navigateToSummary();
  }
  navigateToAccount() {
    this.routingService.navigateToAccount();
  }
  navigateToSettings() {
    this.routingService.navigateToSettings();
  }
  navigateToPrivacy() {
    this.routingService.navigateToPrivacy();
  }
}
