import { TestBed } from '@angular/core/testing';

import { FilmInformationService } from './film-information.service';

describe('FilmInformationService', () => {
  let service: FilmInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
