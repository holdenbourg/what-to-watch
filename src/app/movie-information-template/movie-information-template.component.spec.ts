import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInformationTemplateComponent } from './movie-information-template.component';

describe('MovieInformationTemplateComponent', () => {
  let component: MovieInformationTemplateComponent;
  let fixture: ComponentFixture<MovieInformationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieInformationTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieInformationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
