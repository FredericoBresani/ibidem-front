import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../../models/course.model';
import { Article } from '../../models/article.model';
import { ContentScrollConfig } from '../../models/content-scroll-config.model';
import { Course } from '../../models/course.model';
import { CoursesEvaluation } from '../../models/courses-evaluation.model';

@Component({
  selector: 'app-scrollable-content',
  templateUrl: './scrollable-content.component.html',
  styleUrls: ['./scrollable-content.component.scss']
})
export class ScrollableContentComponent implements OnInit, OnChanges {

  @Input() public articles: Article[] = [];

  @Input() public courses: Course[] = [];

  @Input() public modules: Module[] = [];

  @Input() public evaluations: CoursesEvaluation[] = [];

  @Input() public type = '';

  @Input() public element_width = 0;

  @ViewChild('scrollable') scrollable = {} as any;

  public sc: ContentScrollConfig = {} as any;

  constructor(private router: Router) { }

  public ngOnInit(): void {/* */}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['articles']) {
      this.setScrollConfig(this.articles.length);
    } else if (changes['courses']) {
      this.setScrollConfig(this.courses.length);
    } else if (changes['modules']) {
      if (this.modules) {
        this.setScrollConfig(this.modules.length);
      }
    } else if (changes['evaluations']) {
      if (this.evaluations) {
        this.setScrollConfig(this.evaluations.length);
      }
    }
  }

  public navigateTo(author: string, elementId: string): void {
    if (this.type === 'course_cape') {
      this.router.navigate([`/courses/${elementId}`]);
    } else if (this.type === 'article') {
      this.router.navigate([`/articles/${author}/${elementId}`]);
    }
  }

  public scrollDiv(event: Event, direction: string): void {
    if (this.sc.scrollable) {
      if (direction === 'left' && (this.sc.scrolled > 0)) {
        this.sc.scrolled -= this.sc.scroll_amount;
        this.sc.scrollable.scroll({
          left: this.sc.scrolled,
          behavior: 'smooth',
        });
      }
      else if (direction === 'right' && this.sc.scrolled !== this.sc.max_scroll){
        if ((this.sc.max_scroll - (this.sc.scrolled + this.sc.scroll_amount)) < 0) {
          this.sc.scrolled += (this.sc.max_scroll - this.sc.scrolled);
          this.sc.scrollable.scroll({
            left: this.sc.scrolled,
            behavior: 'smooth',
          });
        } else {
            this.sc.scrolled += this.sc.scroll_amount;
            this.sc.scrollable.scroll({
              left: this.sc.scrolled,
              behavior: 'smooth',
            });
          }
        }
      }
  }

  public setScrollConfig(elementCount: number): void {
    const scrollable = this.scrollable.nativeElement as HTMLElement;
    if (scrollable) {
      setTimeout(() => {
        if (this.type === 'course_module') {
          scrollable.setAttribute('style', 'align-items: stretch');
        }
        for (let i = 0; i < elementCount; i++) {
          scrollable?.children[i].setAttribute('style', `min-width: ${this.element_width}px;`);
        }
        this.sc = {
          scrollable: scrollable,
          element_count: elementCount,
          scrolled: 0,
          scroll_amount: this.element_width,
          max_scroll: (elementCount*this.element_width) - scrollable?.offsetWidth + this.element_width,
          element_width: this.element_width,
          content_width: scrollable?.offsetWidth,
        };
      }, 1)
    }
  }

}
