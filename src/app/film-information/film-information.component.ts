import { Component, inject } from '@angular/core';
import { ExtensiveSearchFilmModel } from '../services/models/omdb-api/extensive-film-api-search-response-model';
import { CommonModule } from '@angular/common';
import { FilmInformationTemplateComponent } from '../film-information-template/film-information-template.component';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { MovieResponseModel } from '../services/models/mdb-list-api/movie-response-model';
import { SeriesResponseModel } from '../services/models/mdb-list-api/series-response-model';

@Component({
  selector: 'app-film-information',
  standalone: true,
  imports: [CommonModule, FilmInformationTemplateComponent],
  templateUrl: './film-information.component.html',
  styleUrl: './film-information.component.scss'
})
export class FilmInformationComponent {
  private apiService: ApiService = inject(ApiService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  omdbResult: ExtensiveSearchFilmModel[] = [];

  filmType: string = '';
  imdbId: string = '';

  ngOnInit() {
    //sets the type/imdbId for the look up from the url parameter
    this.filmType = this.activatedRoute.snapshot.params['type'];
    this.imdbId = this.activatedRoute.snapshot.params['imdbId'];

    this.omdbResult = this.apiService.search1FilmOmdb(this.imdbId);

    console.log(this.omdbResult);
  }

}
