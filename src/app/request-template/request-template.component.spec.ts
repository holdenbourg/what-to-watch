import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTemplateComponent } from './request-template.component';

describe('RequestTemplateComponent', () => {
  let component: RequestTemplateComponent;
  let fixture: ComponentFixture<RequestTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
