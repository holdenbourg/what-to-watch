import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCommentTemplateComponent } from './feed-comment-template.component';

describe('FeedCommentTemplateComponent', () => {
  let component: FeedCommentTemplateComponent;
  let fixture: ComponentFixture<FeedCommentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedCommentTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedCommentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
