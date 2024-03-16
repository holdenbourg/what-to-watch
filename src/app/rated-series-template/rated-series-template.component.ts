import { Component, Input } from '@angular/core';
import { RatedSeriesModel } from '../services/models/database-objects/rated-series-model';

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
    postId: '',
    poster: '',
    title: '',
    releaseDate: '',
    rated: '',
    seasons: 0,
    episodes: 0,
    genres: [],
    acting: 0,
    visuals: 0,
    story: 0,
    length: 0,
    pacing: 0,
    ending: 0,
    rating: 0,
    username: '',
    dateRated: ''
  }
}
