import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFilmTemplateComponent } from './rate-film-template.component';

describe('RateMovieTemplateComponent', () => {
  let component: RateFilmTemplateComponent;
  let fixture: ComponentFixture<RateFilmTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateFilmTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateFilmTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
