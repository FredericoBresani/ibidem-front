import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletPointComponent } from './bullet-point.component';

describe('BulletPointComponent', () => {
  let component: BulletPointComponent;
  let fixture: ComponentFixture<BulletPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
