import { TestBed } from '@angular/core/testing';

import { RatedSeriesInformationService } from './rated-series-information.service';

describe('RatedSeriesInformationService', () => {
  let service: RatedSeriesInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatedSeriesInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
