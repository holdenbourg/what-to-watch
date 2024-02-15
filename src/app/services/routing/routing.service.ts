import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class RoutingService {
  private router: Router = inject(Router);

  navigateToHome() {
    this.router.navigateByUrl('/home');
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
  navigateToMovieInformation(imdbId: string) {
    this.router.navigateByUrl(`/film-information/movie/${imdbId}`);
  }
  navigateToSeriesInformation(imdbId: string) {
    this.router.navigateByUrl(`/film-information/series/${imdbId}`);
  }
  navigateToRateMovie(imdbId?: string) {
    this.router.navigateByUrl(`/rate-movie/${imdbId}`);
  }
  navigateToRateSeries(imdbId?: string) {
    this.router.navigateByUrl(`/rate-series/${imdbId}`);
  }
  navigateToMovies() {
    this.router.navigateByUrl(`/movies`);
  }
  navigateToEditMovie() {
    this.router.navigateByUrl(`/edit-movie`);
  }
  navigateToShows() {
    this.router.navigateByUrl(`/shows`);
  }
  navigateToEditSeries() {
    this.router.navigateByUrl(`/edit-series`);
  }
  navigateToSummary() {
    this.router.navigateByUrl(`/summary`);
  }
  navigateToAccount(username: string) {
    this.router.navigateByUrl(`/account/${username}`);
  }
  navigateToSettings() {
    this.router.navigateByUrl(`/settings/account-info`);
  }
  navigateToPrivacy() {
    this.router.navigateByUrl(`/settings/privacy`);
  }
}
