import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedMovieTemplateComponent } from './rated-movie-template.component';

describe('RatedMovieTemplateComponent', () => {
  let component: RatedMovieTemplateComponent;
  let fixture: ComponentFixture<RatedMovieTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatedMovieTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatedMovieTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
