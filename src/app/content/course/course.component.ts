import { Component, OnInit } from '@angular/core';
import { courseCharacteristics } from '../options/course-characteristics.options';
import { Course } from '../../shared/models/course.model';
import { CoursesEvaluation } from '../../shared/models/courses-evaluation.model';
import { ContentService } from '../content.service';
import { Subscription } from 'rxjs';
import { coursesMock } from '../mock/course.mock';
import { ActivatedRoute, Params } from '@angular/router';
import { ContentScrollConfig } from '../../shared/models/content-scroll-config.model';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public courseCharacteristics = courseCharacteristics;

  public courseMock = coursesMock;

  public course: Course = {} as any;

  public sc: ContentScrollConfig = {} as any;

  public scEvaluations: ContentScrollConfig = {} as any;

  public evaluations: CoursesEvaluation[] = [];

  public subscription = new Subscription();

  constructor(
    private readonly contentService: ContentService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
    ) { }

  public ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id']) {
          this.contentService.getCourseById(params['id']).subscribe((course: Course) => {
            this.course = course;
            this.setCourseCharacteristics(course);
            this.contentService.getCourseEvaluations(course._id!).subscribe((evaluations: CoursesEvaluation[]) => {
              this.evaluations = evaluations;
            })
            /*this.evaluations.push({
              username: 'frederico',
              course_id: this.course._id!,
              stars: 5,
              comment: `Aprendizado dinâmico, ideal pra quem quer aprender o essencial`,
            });
            this.contentService.registerCourseEvaluation(this.evaluations[0], this.localStorageService.getAccessToken()!).subscribe((course: Course) => {
              console.log(course);
            })*/
          });
        }
      })
    );
    /*for (const course of this.courseMock) {
      this.contentService.registerCourse(course, this.localStorageService.getAccessToken()!).subscribe((course) => {
        console.log(course);
      })
    }*/
  }

  public showCharacteristicList(event: MouseEvent): void {
    const characteristicElement = (event.target as HTMLElement).parentElement as HTMLElement;
    const listElement = (event.target as HTMLElement).nextElementSibling as HTMLElement;
    const showingElement = document.querySelector('.list-show') as HTMLElement;
    const selectedCharacteristic = document.querySelector('.characteristic-selected') as HTMLElement;
    if (showingElement === listElement) {
      showingElement.setAttribute('class', 'list');
    } else if (showingElement) {
      showingElement.setAttribute('class', 'list');
      listElement?.classList.toggle('list-show');
    } else {
      listElement?.classList.toggle('list-show');
    }

    if (selectedCharacteristic === characteristicElement) {
      selectedCharacteristic.setAttribute('class', 'characteristic');
    } else if (selectedCharacteristic) {
      selectedCharacteristic.setAttribute('class', 'characteristic');
      characteristicElement?.classList.toggle('characteristic-selected');
    } else {
      characteristicElement?.classList.toggle('characteristic-selected');
    }
  }

  public setCourseCharacteristics(course: Course): void {
    for (const characteristic of courseCharacteristics) {
      switch (characteristic.key) {
        case 'for_whom':
          characteristic.infos = course.for_whom;
          break;
        case 'do_it_if':
          characteristic.infos = course.do_it_if;
          break;
        case 'answered_questions':
          characteristic.infos = course.answered_questions;
          break;
        case 'what_is_needed':
          characteristic.infos = course.what_is_needed;
          break;
        case 'about_instructor':
          characteristic.infos = course.about_instructor;
          break;
        case 'about_methodolgy':
          characteristic.infos = course.about_methodology;
          break;
        default:
          break;
      }
    }
  }

}
