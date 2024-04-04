import { Injectable } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { ArticlesClient } from '../shared/client/articles.client';
import { Observable } from 'rxjs';
import { ArticleFilter } from '../shared/models/article-filter.model';
import { CoursesClient } from '../shared/client/courses.client';
import { UnfinishedCourse } from '../shared/models/unfinished-course.model';
import { Course } from '../shared/models/course.model';
import { CoursesEvaluation } from '../shared/models/courses-evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public constructor(private contentClient: ArticlesClient, private readonly coursesClient: CoursesClient) {}

  // Articles
  public getArticles(filter: ArticleFilter): Observable<Article[]> {
    return this.contentClient.getArticles(filter);
  }

  public getArticleById(id: string): Observable<Article> {
      return this.contentClient.getArticleById(id);
  }

  public getArticleCategories(): Observable<string[]> {
      return this.contentClient.getArticleCategories();
  }

  public getMostViewedArticles(): Observable<Article[]> {
    return this.contentClient.getMostViewedArticles();
  }

  public insertArticle(article: Article): Observable<void> {
    return this.contentClient.insertArticle(article);
  }

  public searchArticle(stringToSearch: string): Observable<Article[]> {
    return this.contentClient.searchArticle(stringToSearch);
  }

  // Courses
  public addEmailToNotify(course: UnfinishedCourse): Observable<{ email: string}> {
    return this.coursesClient.addEmailToNotify(course);
  }

  public addUnfinishedCourse(course: { name: string; emails: string[] }, token: string): Observable<void> {
    return this.coursesClient.addUnfinishedCourses(course, token);
  }

  public incrementUnfinishedAccess(courseTitle: string): Observable<void> {
    return this.coursesClient.incrementUnfinishedAccess(courseTitle);
  }

  public registerCourse(course: Course, token: string): Observable<Course> {
    return this.coursesClient.registerCourse(course, token);
  }

  public getCourses(): Observable<Course[]> {
    return this.coursesClient.getCourses();
  }

  public getCourseById(courseId: string): Observable<Course> {
    return this.coursesClient.getCourseById(courseId);
  }

  public registerCourseEvaluation(evaluation: CoursesEvaluation, token: string): Observable<Course> {
    return this.coursesClient.registerCourseEvaluation(evaluation, token);
  }

  public getCourseEvaluations(courseId: string): Observable<CoursesEvaluation[]> {
    return this.coursesClient.getCourseEvaluations(courseId);
  }

}
