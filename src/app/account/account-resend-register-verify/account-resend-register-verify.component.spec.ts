import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResendRegisterVerifyComponent } from './account-resend-register-verify.component';

describe('AccountResendRegisterVerifyComponent', () => {
  let component: AccountResendRegisterVerifyComponent;
  let fixture: ComponentFixture<AccountResendRegisterVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountResendRegisterVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResendRegisterVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
