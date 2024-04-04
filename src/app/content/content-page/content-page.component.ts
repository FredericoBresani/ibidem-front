import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';
import { ContentService } from '../content.service';
import { Subscription } from 'rxjs';
import { articles } from '../mock/article.mock';
import { StringToDirectoryNameService } from '../../shared/services/string-to-directory-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleFilter } from 'src/app/shared/models/article-filter.model';
import { articleRankOptions } from '../options/article-rank-options';
import { ContentScrollConfig } from 'src/app/shared/models/content-scroll-config.model';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit, OnDestroy {

  public articles: Article[] = [];

  public articleCategories: string[] = [];

  public showCategories = false;

  public articleRanks = articleRankOptions;

  public articlesFilter: ArticleFilter = { new: true };

  private subs = new Subscription();

  public constructor(
    private readonly contentService: ContentService,
    private readonly stringToDirName: StringToDirectoryNameService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    // this.insertArticle();
    this.subs.add(
      this.contentService.getArticles(this.articlesFilter).subscribe((articles) => {
        this.articles = articles;
      })
    );
    this.subs.add(
      this.contentService.getArticleCategories().subscribe((categories) => {
        this.articleCategories = categories;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public getScrollablePadding(): number {
    const scrollable = document.querySelector('.content-articles');
    const paddingString = window.getComputedStyle(scrollable!).paddingLeft;
    const paddingNumber = Number(paddingString.slice(0, paddingString.length - 2));
    return paddingNumber;
  }

  public updateFilter(attribute: string): void {
      if (attribute === 'new') {
        this.articlesFilter = { new: true };
      }
      else if (attribute === 'most_viewed'){
        this.articlesFilter = { most_viewed: true };
      }
      else if (attribute === 'best_rating'){
        this.articlesFilter = { best_rating: true };
      }
      this.getArticleByRankings();
  }

  public getArticleByRankings(): void {
    this.subs.add(
      this.contentService.getArticles(this.articlesFilter).subscribe((articles) => {
        this.articles = articles;
      })
    );
  }

  public insertArticle(): void {
    articles.forEach(element => {
      element.author = this.stringToDirName.stringToDirName(element.author);
      this.subs.add(
        this.contentService.insertArticle(element).subscribe((result) => ({
            next() {
              console.log('Everything okay');
            },
            error() {
              console.log('Something went wrong');
            },
            complete() {
              console.log('Everything added');
            }
          })
        )
      );
    });
  }

  public goToSingleCategory(category: string): void {
    this.router.navigate([`/category/articles/${category}`]);
  }

  public navigateTo(author: string, articleId?: string): void {
    this.router.navigate([`/articles/${author}/${articleId}`]);
  }

}
