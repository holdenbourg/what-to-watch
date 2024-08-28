import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAccountComponent } from './public-account.component';

describe('PublicAccountComponent', () => {
  let component: PublicAccountComponent;
  let fixture: ComponentFixture<PublicAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
