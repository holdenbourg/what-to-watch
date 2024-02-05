import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmInformationTemplateComponent } from './film-information-template.component';

describe('FilmInformationTemplateComponent', () => {
  let component: FilmInformationTemplateComponent;
  let fixture: ComponentFixture<FilmInformationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmInformationTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmInformationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
