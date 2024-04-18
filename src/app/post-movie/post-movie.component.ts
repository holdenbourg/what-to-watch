import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-post-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-movie.component.html',
  styleUrl: './post-movie.component.scss'
})
export class PostMovieComponent implements OnInit {
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  ngOnInit() {
    this.localStorageService.clearInformation('currentRateMovie');

  }
}
