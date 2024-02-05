import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSeriesComponent } from './rate-series.component';

describe('RateShowComponent', () => {
  let component: RateSeriesComponent;
  let fixture: ComponentFixture<RateSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
