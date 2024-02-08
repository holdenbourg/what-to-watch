import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RateMovieComponent } from './rate-movie/rate-movie.component';
import { RateSeriesComponent } from './rate-series/rate-series.component';
import { FilmInformationComponent } from './film-information/film-information.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
import { SummaryComponent } from './summary/summary.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {path: '', component: LoginRegisterComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'movies/:username', component: MoviesComponent},
  {path: 'shows/:username', component: ShowsComponent},
  {path: 'edit-movie/:input', component: EditMovieComponent},
  {path: 'edit-series/:input', component: EditSeriesComponent},
  {path: 'settings/account-info', component: SettingsComponent},
  {path: 'settings/privacy', component: PrivacyComponent},
  {path: 'search/:type', component: SearchComponent},
  {path: 'search/:type/:input', component: SearchComponent},
  {path: 'film-information/:type/:imdbId', component: FilmInformationComponent},
  {path: 'rate-movie/:imdbId', component: RateMovieComponent},
  {path: 'rate-series/:imdbId', component: RateSeriesComponent},
  {path: 'account/:username', component: AccountComponent},
  {path: 'summary/:username', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
