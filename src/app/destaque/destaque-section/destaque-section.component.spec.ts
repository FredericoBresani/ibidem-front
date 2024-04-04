import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestaqueSectionComponent } from './destaque-section.component';

describe('DestaqueSectionComponent', () => {
  let component: DestaqueSectionComponent;
  let fixture: ComponentFixture<DestaqueSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestaqueSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestaqueSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
