import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedFilmTemplateComponent } from './searched-film-template.component';

describe('SearchedFilmTemplateComponent', () => {
  let component: SearchedFilmTemplateComponent;
  let fixture: ComponentFixture<SearchedFilmTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedFilmTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchedFilmTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
