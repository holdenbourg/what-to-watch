import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerFollowingTemplateComponent } from './follower-following-template.component';

describe('FollowerFollowingTemplateComponent', () => {
  let component: FollowerFollowingTemplateComponent;
  let fixture: ComponentFixture<FollowerFollowingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowerFollowingTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowerFollowingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
