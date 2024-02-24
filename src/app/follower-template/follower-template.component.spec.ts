import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerTemplateComponent } from './follower-template.component';

describe('FollowerTemplateComponent', () => {
  let component: FollowerTemplateComponent;
  let fixture: ComponentFixture<FollowerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowerTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
