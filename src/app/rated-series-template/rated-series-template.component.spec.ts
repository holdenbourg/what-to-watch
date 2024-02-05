import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedSeriesTemplateComponent } from './rated-series-template.component';

describe('RatedMovieTemplateComponent', () => {
  let component: RatedSeriesTemplateComponent;
  let fixture: ComponentFixture<RatedSeriesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatedSeriesTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatedSeriesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
