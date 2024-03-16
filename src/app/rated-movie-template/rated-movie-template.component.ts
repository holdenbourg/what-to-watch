import { Component, Input } from '@angular/core';
import { RatedMovieModel } from '../services/models/database-objects/rated-movie-model';

@Component({
  selector: 'app-rated-movie-template',
  standalone: true,
  imports: [],
  templateUrl: './rated-movie-template.component.html',
  styleUrl: './rated-movie-template.component.scss'
})
export class RatedMovieTemplateComponent {
  @Input()
  ratedFilm: RatedMovieModel = {
    postId: '',
    poster: '',
    title: '',
    releaseDate: '',
    rated: '',
    runTime: 0,
    genres: [],
    acting: 0,
    visuals: 0,
    story: 0,
    climax: 0,
    pacing: 0,
    ending: 0,
    rating: 0,
    username: '',
    dateRated: ''
  }
}
