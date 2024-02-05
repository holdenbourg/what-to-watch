import { TestBed } from '@angular/core/testing';

import { RatedMovieInformationService } from './rated-movie-information.service';

describe('RatedMovieInformationService', () => {
  let service: RatedMovieInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatedMovieInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
