import { Component, Input } from '@angular/core';
import { RatedSeriesModel } from '../services/models/rated-films/rated-series-model';

@Component({
  selector: 'app-rated-series-template',
  standalone: true,
  imports: [],
  templateUrl: './rated-series-template.component.html',
  styleUrl: './rated-series-template.component.scss'
})
export class RatedSeriesTemplateComponent {
  @Input()
  ratedFilm: RatedSeriesModel = {
    title: 'blank',
    releaseDate: 'blank',
    type: 'blank',
    rated: 'blank',
    poster: 'blank',
    acting: 0,
    visuals: 0,
    story: 0,
    length: 0,
    pacing: 0,
    ending: 0,
    rating: 0,
    username: 'blank',
    dateRated: 'blank'
  }
}
