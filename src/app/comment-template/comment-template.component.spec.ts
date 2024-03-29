import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTemplateComponent } from './comment-template.component';

describe('CommentTemplateComponent', () => {
  let component: CommentTemplateComponent;
  let fixture: ComponentFixture<CommentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
