import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedAccountTemplateComponent } from './blocked-account-template.component';

describe('BlockedAccountTemplateComponent', () => {
  let component: BlockedAccountTemplateComponent;
  let fixture: ComponentFixture<BlockedAccountTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockedAccountTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockedAccountTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
