import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RatedMovieModel } from '../services/models/rated-films/rated-movie-model';
import { RoutingService } from '../services/routing/routing.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent {
  private routingService: RoutingService = inject(RoutingService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  activeMovie: RatedMovieModel = this.localStorageService.getInformation('currentEditMovie');

  public acting: number = this.activeMovie.acting;
  public visuals: number = this.activeMovie.visuals;
  public story: number = this.activeMovie.story;
  public pacing: number = this.activeMovie.pacing;
  public climax: number = this.activeMovie.climax;
  public ending: number = this.activeMovie.ending;

  public ratingAverage: number = this.getRatingsAverage();


  onEditRating() {
    //post updated rating to the database

    //then route back to movies
    this.localStorageService.clearInformation('currentEditMovie');
    this.routingService.navigateToMovies();
  }

  //changes the rating up/down 1 and resets the average
  onUpActing() {
    if(this.acting != undefined && this.acting != 10) this.acting = this.acting + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownActing() {
    if(this.acting != undefined && this.acting != 1) this.acting = this.acting - 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onUpVisuals() {
    if(this.visuals != undefined && this.visuals != 10) this.visuals = this.visuals + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownVisuals() {
    if(this.visuals != undefined && this.visuals != 1) this.visuals = this.visuals - 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onUpStory() {
    if(this.story != undefined && this.story != 10) this.story = this.story + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownStory() {
    if(this.story != undefined && this.story != 1) this.story = this.story - 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onUpPacing() {
    if(this.pacing != undefined && this.pacing != 10) this.pacing = this.pacing + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownPacing() {
    if(this.pacing != undefined && this.pacing != 1) this.pacing = this.pacing - 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onUpClimax() {
    if(this.climax != undefined && this.climax != 10) this.climax = this.climax + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownClimax() {
    if(this.climax != undefined && this.climax != 1) this.climax = this.climax - 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onUpEnding() {
    if(this.ending != undefined && this.ending != 10) this.ending = this.ending + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownEnding() {
    if(this.ending != undefined && this.ending != 1) this.ending = this.ending - 1;
    this.ratingAverage = this.getRatingsAverage();
  }

  //gets the average of the ratings
  getRatingsAverage() {
    return Number(((this.acting + this.visuals + this.story + this.pacing + this.climax + this.ending) / 6).toFixed(1));
  }
}
