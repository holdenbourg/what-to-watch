import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggableAccountTemplateComponent } from './taggable-account-template.component';

describe('TaggableAccountTemplateComponent', () => {
  let component: TaggableAccountTemplateComponent;
  let fixture: ComponentFixture<TaggableAccountTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggableAccountTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaggableAccountTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
