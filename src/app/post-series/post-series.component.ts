import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-post-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-series.component.html',
  styleUrl: './post-series.component.scss'
})
export class PostSeriesComponent implements OnInit {
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  ngOnInit() {
    this.localStorageService.clearInformation('currentRateSeries');

  }

}
