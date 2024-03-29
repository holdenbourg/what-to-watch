import { SeasonModel } from "./mdb-list-api/season-model"
import { StreamModel } from "./mdb-list-api/stream-model"
import { RatingModel } from "./omdb-api/rating-model"

export interface CombinedFilmApiResponseModel {
    title?: string,
    year?: number,
    rated?: string,
    released?: string,
    runTime?: number,
    genre?: string,
    director?: string,
    writer?: string,
    actors?: string,
    plot?: string,
    language?: string,
    country?: string,
    awards?: string,
    poster?: string,
    ratings?: RatingModel[],
    metascore?: number,
    imdbRating?: number,
    imdbVotes?: number,
    imdbId?: string,
    type?: string,
    dvd?: string,
    boxOffice?: string,
    production?: string,
    website?: string,
    response?: string
    watch_providers?: StreamModel[],
    trailer?: string
    seasons?: SeasonModel[]
}