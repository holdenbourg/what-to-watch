import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountArchiveComponent } from './account-archive.component';

describe('AccountArchiveComponent', () => {
  let component: AccountArchiveComponent;
  let fixture: ComponentFixture<AccountArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountArchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
