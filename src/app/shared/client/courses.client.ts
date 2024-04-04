import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RequestService } from "../services/request.service";
import { UnfinishedCourse } from "../models/unfinished-course.model";
import { Course } from "../models/course.model";
import { CoursesEvaluation } from "../models/courses-evaluation.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesClient {

  public endPoint = 'courses';

  constructor(private readonly requestService: RequestService) {}

  public registerCourse(course: Course, token: string): Observable<Course> {
    return this.requestService.post<Course, Course>(
      `${this.endPoint}/register`,
      course,
      { Authorization: 'Bearer '+token }
    );
  }

  public addEmailToNotify(course: UnfinishedCourse): Observable<{ email: string }> {
    return this.requestService.put<UnfinishedCourse, { email: string }>(
      `${this.endPoint}/add-email`,
      course
    );
  }

  public addUnfinishedCourses(course: { name: string; emails: string[] }, token: string): Observable<void> {
    return this.requestService.post<{ name: string; emails: string[] }, void>(
      `${this.endPoint}/unfinished`,
      course,
      { Authorization: 'Bearer '+token }
      );
  }

  public incrementUnfinishedAccess(courseTitle: string): Observable<void> {
    return this.requestService.put<{ title: string }, void>(`${this.endPoint}/iuaccess`, { title: courseTitle })
  }

  public getCourses(): Observable<Course[]> {
    return this.requestService.get<Course[], void>(`${this.endPoint}`)
  }

  public getCourseById(courseId: string): Observable<Course> {
    return this.requestService.get<Course, { courseId: string }>(`${this.endPoint}/by-id`,
      { courseId }
    )
  }

  public registerCourseEvaluation(evaluation: CoursesEvaluation, token: string): Observable<Course> {
    return this.requestService.post<CoursesEvaluation, Course>(
      `${this.endPoint}/evaluate`,
      evaluation,
      { Authorization: 'Bearer '+token }
      )
  }

  public getCourseEvaluations(courseId: string): Observable<CoursesEvaluation[]> {
    return this.requestService.get<CoursesEvaluation[], {courseId: string}>(`${this.endPoint}/course-evaluations`, { courseId });
  }
}
