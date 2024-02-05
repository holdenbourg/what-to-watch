import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RatedMovieInformationService } from '../services/film-information/rated-movie-information.service';
import { RatedSeriesInformationService } from '../services/film-information/rated-series-information.service';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';

@Component({
  selector: 'app-edit-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-series.component.html',
  styleUrl: './edit-series.component.scss'
})
export class EditSeriesComponent {
  private routingService: RoutingService = inject(RoutingService);
  public ratedSeriesInformationService: RatedSeriesInformationService = inject(RatedSeriesInformationService);
  public activeSeries?: RatedSeriesModel = this.ratedSeriesInformationService.filmDetails;

  public acting?: number = this.activeSeries?.acting;
  public visuals?: number = this.activeSeries?.visuals;
  public story?: number = this.activeSeries?.story;
  public pacing?: number = this.activeSeries?.pacing;
  public length?: number = this.activeSeries?.length;
  public ending?: number = this.activeSeries?.ending;

  public ratingAverage?: number = this.getRatingsAverage();


  onEditRating() {
    //post updated rating to the database

    //then route back to shows
    if(this.activeSeries != undefined) this.routingService.navigateToShows(this.activeSeries.username);
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
  onUpLength() {
    if(this.length != undefined && this.length != 10) this.length = this.length + 1;
    this.ratingAverage = this.getRatingsAverage();
  }
  onDownLength() {
    if(this.length != undefined && this.length != 1) this.length = this.length - 1;
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
    if(this.acting != undefined && this.visuals != undefined && this.story != undefined && 
       this.pacing != undefined && this.length != undefined && this.ending != undefined) {
      return Number(((this.acting + this.visuals + this.story + this.pacing + 
                      this.length + this.ending) / 6).toFixed(1));
    } else {
      return;
    }
  }
}
