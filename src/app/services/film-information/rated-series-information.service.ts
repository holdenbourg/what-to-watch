import { RatedSeriesModel } from "../models/rated-films/rated-series-model";

export class RatedSeriesInformationService {
  public filmDetails?: RatedSeriesModel = {
    title: "",
    releaseDate: "",
    type: "",
    rated: "",
    poster: "",
    acting: 0,
    visuals: 0,
    story: 0,
    pacing: 0,
    length: 0,
    ending: 0,
    rating: 0,
    username: "",
    dateRated: ""
  }
}
