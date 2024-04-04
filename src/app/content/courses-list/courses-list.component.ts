import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';
import { ContentService } from '../content.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ContentScrollConfig } from 'src/app/shared/models/content-scroll-config.model';
import { StringToDirectoryNameService } from 'src/app/shared/services/string-to-directory-name.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses: Course[] = [];

  public sc: ContentScrollConfig = {} as any;

  public subscription = new Subscription();

  constructor(
    private readonly contentService: ContentService,
    private readonly router: Router,
    private readonly stringToDirNameService: StringToDirectoryNameService,
    ) { }

  public ngOnInit(): void {

    this.subscription.add(
      this.contentService.getCourses().subscribe((courses: Course[]) => {
        this.courses = courses;
      })
    );
  }

  public navigateTo(title: string, articleId?: string): void {
    this.router.navigate([`/courses/${articleId}`]);
  }

}
