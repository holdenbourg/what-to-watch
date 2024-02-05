import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesInformationTemplateComponent } from './series-information-template.component';

describe('SeriesInformationTemplateComponent', () => {
  let component: SeriesInformationTemplateComponent;
  let fixture: ComponentFixture<SeriesInformationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesInformationTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeriesInformationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
