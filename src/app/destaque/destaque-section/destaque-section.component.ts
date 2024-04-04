import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CourseOption, coursesOptions } from '../options/courses-options';
import { ContentService } from 'src/app/content/content.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article.model';
import { Subscription } from 'rxjs';
import { StringToDirectoryNameService } from '../../shared/services/string-to-directory-name.service';

@Component({
  selector: 'app-destaque-section',
  templateUrl: './destaque-section.component.html',
  styleUrls: ['./destaque-section.component.scss']
})
export class DestaqueSectionComponent implements OnInit {

  public courses = coursesOptions;

  public isMobile = false;

  public showPopup = false;

  public popupStatus = 'deactivated';

  public popupCourseTitle = '';

  public highlight_articles: Article[] = [];

  private subs = new Subscription();

  constructor(
    private readonly contentService: ContentService,
    private readonly router: Router,
    private readonly stringToDirName: StringToDirectoryNameService,
    ) {}

  public ngOnInit(): void {
    if (window.navigator.userAgent.indexOf('Macintosh') === -1 && window.navigator.userAgent.indexOf('Linux') === -1 && window.navigator.userAgent.indexOf('Windows') === -1) {
      this.isMobile = true;
    }
    this.subs.add(
      this.contentService.getMostViewedArticles().subscribe((articles: Article[]) => {
        this.highlight_articles = articles;
      })
    )
  }

  public navigateTo(url: string, courseTitle: string): void { //navigate to courses
    if (url) {
      this.router.navigate([`/courses/${url}`]);
    } else {
      this.contentService.incrementUnfinishedAccess(courseTitle).subscribe();
      if (this.popupStatus === 'deactivated') {
          this.popupStatus = 'activated';
      } else {
          this.popupStatus = 'deactivated';
      }
      this.popupCourseTitle = courseTitle;
      this.showPopup = true;
    }
  }

  public swapPlaySeeMore(event: Event): void {
    const play = (event.target as HTMLElement).firstElementChild;
    const seeMore = (event.target as HTMLElement).children[1] as HTMLElement;
    if (play?.getAttribute('style')?.indexOf('flex') !== -1) {
      play?.setAttribute('style', 'display: none');
      seeMore.setAttribute('style', 'display: flex');
    } else {
      play.setAttribute('style', 'display: flex');
      seeMore.setAttribute('style', 'display: none');
    }
  }

  public navigateToArticle(author: string, articleId: string): void {
    void this.router.navigate([`/articles/${author}/${articleId}`]);
  }

  public toggleLongDescription(event: Event): void {
    const elementDescription = (event.target as HTMLElement).parentElement?.parentElement?.firstElementChild;
    elementDescription?.classList.toggle('long-description-activated');
  }

  public copyToClipboard(url: string): void {
    window.navigator.clipboard.writeText(url);
  }
}
