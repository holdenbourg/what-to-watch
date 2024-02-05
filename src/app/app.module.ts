import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RoutingService } from './services/routing/routing.service';
import { ApiService } from './services/api/api.service';
import { UserInputService } from './services/user/user-input.service';
import { UserInformationService } from './services/user/user-information.service';
import { RatedMovieInformationService } from './services/film-information/rated-movie-information.service';
import { RatedSeriesInformationService } from './services/film-information/rated-series-information.service';
import { FilmInformationService } from './services/film-information/film-information.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
            AppRoutingModule, 
            FormsModule,
            LoginRegisterComponent,
            HomeComponent,
            HttpClientModule],
  providers: [HttpClient, 
              RoutingService, 
              ApiService, 
              UserInputService,
              UserInformationService,
              RatedMovieInformationService,
              RatedSeriesInformationService,
              FilmInformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
