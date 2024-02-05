import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedUserTemplateComponent } from './searched-user-template.component';

describe('SearchedUserTemplateComponent', () => {
  let component: SearchedUserTemplateComponent;
  let fixture: ComponentFixture<SearchedUserTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedUserTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchedUserTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
