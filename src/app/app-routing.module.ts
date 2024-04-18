import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { SettingsAccountInfoComponent } from './settings-account-info/settings-account-info.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RateMovieComponent } from './rate-movie/rate-movie.component';
import { RateSeriesComponent } from './rate-series/rate-series.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
import { SummaryComponent } from './summary/summary.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SeriesInformationComponent } from './series-information/series-information.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { AccountTaggedComponent } from './account-tagged/account-tagged.component';
import { AccountArchiveComponent } from './account-archive/account-archive.component';
import { PostMovieComponent } from './post-movie/post-movie.component';
import { PostSeriesComponent } from './post-series/post-series.component';

const routes: Routes = [
  {path: '', component: LoginRegisterComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'shows', component: ShowsComponent},
  {path: 'edit-movie', component: EditMovieComponent},
  {path: 'edit-series', component: EditSeriesComponent},
  {path: 'settings/account-info', component: SettingsAccountInfoComponent},
  {path: 'settings/privacy', component: PrivacyComponent},
  {path: 'search/:type', component: SearchComponent},
  {path: 'search/:type/:input', component: SearchComponent},
  {path: 'film-information/movie/:imdbId', component: MovieInformationComponent},
  {path: 'film-information/series/:imdbId', component: SeriesInformationComponent},
  {path: 'rate-movie/:imdbId', component: RateMovieComponent},
  {path: 'rate-series/:imdbId', component: RateSeriesComponent},
  {path: 'post-movie/:postId', component: PostMovieComponent},
  {path: 'post-series/:postId', component: PostSeriesComponent},
  {path: 'account/:username/posts', component: AccountComponent},
  {path: 'account/:username/tagged', component: AccountTaggedComponent},
  {path: 'account/:username/archive', component: AccountArchiveComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
