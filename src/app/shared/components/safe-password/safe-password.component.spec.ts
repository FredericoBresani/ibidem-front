import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePasswordComponent } from './safe-password.component';

describe('SafePasswordComponent', () => {
  let component: SafePasswordComponent;
  let fixture: ComponentFixture<SafePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
