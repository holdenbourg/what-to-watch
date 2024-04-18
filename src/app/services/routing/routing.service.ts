import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class RoutingService {
  private router: Router = inject(Router);

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  //sidebar page redirects
  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
  navigateToSearchMovies() {
    this.router.navigateByUrl('/search/movies');
  }
  navigateToSearchMoviesWithInput(input: string) {
    this.router.navigateByUrl(`/search/movies/${input}`);
  }
  navigateToSearchSeries() {
    this.router.navigateByUrl('/search/series');
  }
  navigateToSearchSeriesWithInput(input: string) {
    this.router.navigateByUrl(`/search/series/${input}`);
  }
  navigateToSearchUsers() {
    this.router.navigateByUrl('/search/users');
  }
  navigateToSearchUsersWithInput(input: string) {
    this.router.navigateByUrl(`/search/users/${input}`);
  }
  navigateToMovies() {
    this.router.navigateByUrl(`/movies`);
  }
  navigateToShows() {
    this.router.navigateByUrl(`/shows`);
  }
  navigateToSummary() {
    this.router.navigateByUrl(`/summary`);
  }
  navigateToAccountsPosts(username: string) {
    this.router.navigateByUrl(`/account/${username}/posts`);
  }
  navigateToAccountsTagged(username: string) {
    this.router.navigateByUrl(`/account/${username}/tagged`);
  }
  navigateToAccountsArchived(username: string) {
    this.router.navigateByUrl(`/account/${username}/archive`);
  }
  navigateToSettings() {
    this.router.navigateByUrl(`/settings/account-info`);
  }
  navigateToPrivacy() {
    this.router.navigateByUrl(`/settings/privacy`);
  }

  //route once a movie has been selected after search
  navigateToMovieInformation(imdbId: string) {
    this.router.navigateByUrl(`/film-information/movie/${imdbId}`);
  }
  navigateToRateMovie(imdbId?: string) {
    this.router.navigateByUrl(`/rate-movie/${imdbId}`);
  }
  navigateToPostMovie(postId: string) {
    this.router.navigateByUrl(`/post-movie/${postId}`);
  }

  //route once a series has been selected after search
  navigateToSeriesInformation(imdbId: string) {
    this.router.navigateByUrl(`/film-information/series/${imdbId}`);
  }
  navigateToRateSeries(imdbId?: string) {
    this.router.navigateByUrl(`/rate-series/${imdbId}`);
  }
  navigateToPostSeries(postId: string) {
    this.router.navigateByUrl(`/post-series/${postId}`);
  }

  //edit screen for films that have been rated
  navigateToEditMovie() {
    this.router.navigateByUrl(`/edit-movie`);
  }
  navigateToEditSeries() {
    this.router.navigateByUrl(`/edit-series`);
  }
}
