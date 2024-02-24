import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingTemplateComponent } from './following-template.component';

describe('FollowingTemplateComponent', () => {
  let component: FollowingTemplateComponent;
  let fixture: ComponentFixture<FollowingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
