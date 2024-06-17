import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedAccountTemplateComponent } from './tagged-account-template.component';

describe('TaggedAccountTemplateComponent', () => {
  let component: TaggedAccountTemplateComponent;
  let fixture: ComponentFixture<TaggedAccountTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggedAccountTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaggedAccountTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
