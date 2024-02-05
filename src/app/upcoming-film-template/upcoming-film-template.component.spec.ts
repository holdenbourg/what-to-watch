import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingFilmTemplateComponent } from './upcoming-film-template.component';

describe('UpcomingFilmTemplateComponent', () => {
  let component: UpcomingFilmTemplateComponent;
  let fixture: ComponentFixture<UpcomingFilmTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingFilmTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingFilmTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
