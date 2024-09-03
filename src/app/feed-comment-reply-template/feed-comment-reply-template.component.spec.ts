import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCommentReplyTemplateComponent } from './feed-comment-reply-template.component';

describe('FeedCommentReplyTemplateComponent', () => {
  let component: FeedCommentReplyTemplateComponent;
  let fixture: ComponentFixture<FeedCommentReplyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedCommentReplyTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedCommentReplyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
