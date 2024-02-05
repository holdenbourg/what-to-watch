import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsFeedTemplateComponent } from './news-feed-post-template.component';

describe('HomeNewsFeedTemplateComponent', () => {
  let component: HomeNewsFeedTemplateComponent;
  let fixture: ComponentFixture<HomeNewsFeedTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewsFeedTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNewsFeedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
