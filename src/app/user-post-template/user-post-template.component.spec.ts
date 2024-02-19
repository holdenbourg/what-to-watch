import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostTemplateComponent } from './user-post-template.component';

describe('UserPostTemplateComponent', () => {
  let component: UserPostTemplateComponent;
  let fixture: ComponentFixture<UserPostTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPostTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPostTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
