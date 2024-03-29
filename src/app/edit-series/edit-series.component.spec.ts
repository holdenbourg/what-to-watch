import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeriesComponent } from './edit-series.component';

describe('EditSeriesComponent', () => {
  let component: EditSeriesComponent;
  let fixture: ComponentFixture<EditSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
