import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class RoutingService {
  private router: Router = inject(Router);

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
  navigateToNews() {
    this.router.navigateByUrl('/news');
  }
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
  navigateToSearchMovies() {
    this.router.navigateByUrl('/search/movies');
  }
  navigateToSearchSeries() {
    this.router.navigateByUrl('/search/series');
  }
  navigateToSearchUsers() {
    this.router.navigateByUrl('/search/users');
  }
  navigateToSearchMoviesWithInput(input: string) {
    this.router.navigateByUrl(`/search/movies/${input}`);
  }
  navigateToSearchSeriesWithInput(input: string) {
    this.router.navigateByUrl(`/search/series/${input}`);
  }
  navigateToSearchUsersWithInput(input: string) {
    this.router.navigateByUrl(`/search/users/${input}`);
  }
  navigateToFilmInformation(type: string, imdbId: string) {
    this.router.navigateByUrl(`/film-information/${type}/${imdbId}`);
  }
  navigateToRateMovie(imdbId?: string) {
    this.router.navigateByUrl(`/rate-movie/${imdbId}`);
  }
  navigateToRateSeries(imdbId?: string) {
    this.router.navigateByUrl(`/rate-series/${imdbId}`);
  }
  navigateToMovies(username: string) {
    this.router.navigateByUrl(`/movies/${username}`);
  }
  navigateToEditMovie(input?: string) {
    this.router.navigateByUrl(`/edit-movie/${input}`);
  }
  navigateToShows(username: string) {
    this.router.navigateByUrl(`/shows/${username}`);
  }
  navigateToEditSeries(input?: string) {
    this.router.navigateByUrl(`/edit-series/${input}`);
  }
  navigateToSummary(username: string) {
    this.router.navigateByUrl(`/summary/${username}`);
  }
  navigateToAccount(username: string) {
    this.router.navigateByUrl(`/account/${username}`);
  }
  navigateToSettings() {
    this.router.navigateByUrl('/settings/account-info');
  }
  navigateToPrivacy() {
    this.router.navigateByUrl('/settings/privacy');
  }
}
