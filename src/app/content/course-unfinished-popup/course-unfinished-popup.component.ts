import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../content.service';
import { Subscription } from 'rxjs';
import { UnfinishedCourse } from 'src/app/shared/models/unfinished-course.model';
import { coursesOptions } from 'src/app/destaque/options/courses-options';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';

@Component({
  selector: 'app-course-unfinished-popup',
  templateUrl: './course-unfinished-popup.component.html',
  styleUrls: ['./course-unfinished-popup.component.scss']
})
export class CourseUnfinishedPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public title = '';

  @Input() public status = '';

  @Input() public show?: boolean;

  @Input() public courseTitle?: string;

  public showPopupResponse = false;

  public popupResponse = '';

  public unfinishedCourses?: { name: string; emails: string[]}[];

  public unfinishedCourse?: UnfinishedCourse;

  public emailForm: FormGroup;

  private subs = new Subscription();

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly contentService: ContentService,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.emailForm = this.setupForm();
   }

  public ngOnInit(): void {
    this.unfinishedCourses = this.configureUnfinishedCourses();
    /* this is to add unfinished courses to the database, it cant go to production

    this.subs.add(
      for (const course of this.unfinishedCourses){
        this.contentService.addUnfinishedCourse(course, this.localStorageService.getAccessToken()).subscribe(
          () => {
          console.log('worked');
        })
      }

    )*/
  }

  public ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  public configureUnfinishedCourses(): { name: string; emails: string[]}[] {
    const unfinished: { name: string; emails: string[]}[] = [];
    coursesOptions.forEach(course => {
        if (!course.url) {
          unfinished.push({ name: course.name, emails: ['']});
        }
    });
    return unfinished;
  }

  public ngOnChanges(changes: SimpleChanges): void {
      if (changes['status'] || changes['show']?.currentValue) {
        if (changes['courseTitle']?.currentValue === '') {
          this.show = false;
        } else {
          this.show = true;
        }
      }
  }

  public closePopup(event: Event): void {
    if ((event.target as HTMLElement).getAttribute('class') === 'popup') {
      this.show = undefined;
      this.showPopupResponse = false;
      this.popupResponse = '';
    }
  }

  public onSubmit(): void {
    this.unfinishedCourse = { ...this.emailForm.value, name: this.courseTitle };
    this.subs.add(
      this.contentService.addEmailToNotify(this.unfinishedCourse!).subscribe({
        next: (addedEmail: { email: string }) => {
          this.emailForm.patchValue({
            email: ''
          });
          this.setPopupResponse(`${addedEmail.email.substring(0, 5)}***@** adicionado com sucesso!`);
        },
        error: (response) => {
          if (response?.error?.message === 'EMAIL_ALREADY_ADDED') {
            this.setPopupResponse('Email já adicionado!');
          }
        },
        complete: () => { /*empty*/ }
      })
    )
  }

  public setPopupResponse(message: string): void {
    this.showPopupResponse = true;
    this.popupResponse = message;
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

}
