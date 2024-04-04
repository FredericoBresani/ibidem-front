import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordUpdatedComponent } from './account-password-updated.component';

describe('AccountPasswordUpdatedComponent', () => {
  let component: AccountPasswordUpdatedComponent;
  let fixture: ComponentFixture<AccountPasswordUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPasswordUpdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
