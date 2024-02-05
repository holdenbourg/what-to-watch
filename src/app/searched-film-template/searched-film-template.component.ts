import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchedFilmModel } from '../services/models/omdb-api/searched-film-model';

@Component({
  selector: 'app-searched-film-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searched-film-template.component.html',
  styleUrl: './searched-film-template.component.scss'
})
export class SearchedFilmTemplateComponent {
  @Input()
  public filmDetails: SearchedFilmModel = {
    Title: '',
    Year: 0,
    imdbID: '',
    Type: '',
    Poster: ''
  }

  //if there is no poster give "no image available" poster
  fixNoPoster(poster: string) {
    if(poster == 'N/A') {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    } else {
      return poster;
    }
  }
}
