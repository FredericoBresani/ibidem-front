import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUnfinishedPopupComponent } from './course-unfinished-popup.component';

describe('CourseUnfinishedPopupComponent', () => {
  let component: CourseUnfinishedPopupComponent;
  let fixture: ComponentFixture<CourseUnfinishedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUnfinishedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnfinishedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
