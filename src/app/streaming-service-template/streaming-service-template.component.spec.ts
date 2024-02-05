import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingServiceTemplateComponent } from './streaming-service-template.component';

describe('StreamingServiceTemplateComponent', () => {
  let component: StreamingServiceTemplateComponent;
  let fixture: ComponentFixture<StreamingServiceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingServiceTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamingServiceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
