import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTaggedComponent } from './account-tagged.component';

describe('AccountTaggedComponent', () => {
  let component: AccountTaggedComponent;
  let fixture: ComponentFixture<AccountTaggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTaggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountTaggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
