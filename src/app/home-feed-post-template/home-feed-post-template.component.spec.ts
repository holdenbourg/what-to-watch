import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeedPostTemplateComponent } from './home-feed-post-template.component';

describe('HomeRegularFeedTemplateComponent', () => {
  let component: HomeFeedPostTemplateComponent;
  let fixture: ComponentFixture<HomeFeedPostTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeedPostTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFeedPostTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
