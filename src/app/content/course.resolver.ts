import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { ContentService } from "./content.service";
import { Subscription, map, Observable } from "rxjs";
import { Course } from "../shared/models/course.model";
@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Observable<Course>> {
  public subscription = new Subscription();

  constructor(private readonly contentService: ContentService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
      const id = route.params['id'];

      return this.contentService.getCourseById(id).pipe(
        map((course: Course) => { return course })
      )

  }
}
