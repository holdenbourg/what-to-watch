import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { SearchedFilmModel } from "../models/omdb-api/searched-film-model";
import { inject } from "@angular/core";
import { FilmSearchResposneModel } from "../models/omdb-api/film-api-search-response-model";
import { ExtensiveSearchFilmModel } from "../models/omdb-api/extensive-film-api-search-response-model";
import { UpcomingFilmModel } from "../models/upcoming-films/upcoming-film-model";
import { UpcomingFilmApiResponseModel } from "../models/upcoming-films/upcoming-film-api-response-model";
import { SeriesResponseModel } from "../models/mdb-list-api/series-response-model";
import { MovieResponseModel } from "../models/mdb-list-api/movie-response-model";

export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private baseOmdbUrl: String = 'http://www.omdbapi.com/?apikey=b08aca5&';
  private baseTmdbUrl: String = 'https://api.themoviedb.org/3/movie/upcoming?api_key=8ba311375001aad1cfee99ce1a5f99bf&';
  private baseMdbUrl: String = 'https://mdblist.p.rapidapi.com/?';

  search10Films(title: string, type: string) {
    let searchedFilms: SearchedFilmModel[] = [];

    const url: string = `${this.baseOmdbUrl}s=${title}&type=${type}`

    this.httpClient.get<FilmSearchResposneModel>(url).subscribe({
      next: (result) => result.Search.forEach(element => {
        let searchedFilm: SearchedFilmModel = {
          Title: element.Title,
          Year: element.Year,
          imdbID: element.imdbID,
          Type: element.Type,
          Poster: element.Poster
        }

        searchedFilms.push(searchedFilm);
      }),
      error: (error: HttpErrorResponse) => console.log(error)
    });

    return searchedFilms;
  }
  search1FilmOmdb(imdbId: string) {
    let filmList: ExtensiveSearchFilmModel[] = [];
    const url: string = `${this.baseOmdbUrl}i=${imdbId}`

    this.httpClient.get<ExtensiveSearchFilmModel>(url).subscribe({
      next: (result) => filmList.push(result),
      error: (error: HttpErrorResponse) => console.log(error)
    });

    return filmList;
  }

  search1FilmOmdbStraight(imdbId: string) {
    const url: string = `${this.baseOmdbUrl}i=${imdbId}`

    return this.httpClient.get<ExtensiveSearchFilmModel>(url).toPromise();
  }
  search1SeriesMdbStraight(imdbId: string) {
    const url: string = `${this.baseMdbUrl}i=${imdbId}`

    return this.httpClient.get<SeriesResponseModel>(url, {headers: {'X-RapidAPI-Key':'c84a0ad4d4msh30291f36f339595p1fc73bjsn35d9a65f193e',
    'X-RapidAPI-Host':'mdblist.p.rapidapi.com'}}).toPromise();
  }
  search1MovieMdbStraight(imdbId: string) {
    const url: string = `${this.baseMdbUrl}i=${imdbId}`

    return this.httpClient.get<MovieResponseModel>(url, {headers: {'X-RapidAPI-Key':'c84a0ad4d4msh30291f36f339595p1fc73bjsn35d9a65f193e',
    'X-RapidAPI-Host':'mdblist.p.rapidapi.com'}}).toPromise();
  }

  /*search1SeriesMdb(imdbId: string) {
    let seriesList: SeriesResponseModel[] = [];
    const url: string = `${this.baseMdbUrl}i=${imdbId}`;

    this.httpClient.get<SeriesResponseModel>(url, {headers: {'X-RapidAPI-Key':'c84a0ad4d4msh30291f36f339595p1fc73bjsn35d9a65f193e',
    'X-RapidAPI-Host':'mdblist.p.rapidapi.com'}}).subscribe({
      next: (result) => seriesList.push(result),
      error: (error: HttpErrorResponse) => console.log(error)
    });

    return seriesList;
  }
  search1MovieMdb(imdbId: string) {
    let movieList: MovieResponseModel[] = [];
    const url: string = `${this.baseMdbUrl}i=${imdbId}`;

    this.httpClient.get<MovieResponseModel>(url, {headers: {'X-RapidAPI-Key':'c84a0ad4d4msh30291f36f339595p1fc73bjsn35d9a65f193e',
    'X-RapidAPI-Host':'mdblist.p.rapidapi.com'}}).subscribe({
      next: (result) => movieList.push(result),
      error: (error: HttpErrorResponse) => console.log(error)
    });
    
    return movieList;
  }*/

  searchUpcomingFilms() {
    let upcomingFilmList: UpcomingFilmModel[] = [];

    var todaysDate = new Date().toJSON().slice(0,10);
    const upcomingFilmsUrl: string = `${this.baseTmdbUrl}language=en-US&region=US&release_date.gte=${todaysDate}`;

    this.httpClient.get<UpcomingFilmApiResponseModel>(upcomingFilmsUrl).subscribe({
      next: (result) => result.results?.forEach(element => {
        let upcomingFilm: UpcomingFilmModel = {
          adult: element.adult,
          backdrop_path: element.backdrop_path,
          genre_ids: element.genre_ids,
          id: element.id,
          original_language: element.original_language,
          original_title: element.original_title,
          overview: element.overview,
          popularity: element.popularity,
          poster_path: element.poster_path,
          release_date: element.release_date,
          title: element.title,
          video: element.video,
          vote_average: element.vote_average,
          vote_count: element.vote_count
        }

        upcomingFilmList.push(upcomingFilm);
      }),
      error: (error: HttpErrorResponse) => console.log(error)
    });
    return upcomingFilmList;
  }
}
