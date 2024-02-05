import { RatedMovieModel } from '../models/rated-films/rated-movie-model';

export class RatedMovieInformationService {
  public filmDetails?: RatedMovieModel = {
    title: "",
    releaseDate: "",
    type: "",
    rated: "",
    poster: "",
    acting: 0,
    visuals: 0,
    story: 0,
    pacing: 0,
    climax: 0,
    ending: 0,
    rating: 0,
    username: "",
    dateRated: ""
  }
}
