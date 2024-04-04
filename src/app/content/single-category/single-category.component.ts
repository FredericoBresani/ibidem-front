import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentService } from '../content.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
import { Params, Router } from '@angular/router';
import { ContentScrollConfig } from 'src/app/shared/models/content-scroll-config.model';


@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit, OnDestroy {

  public articlesByCategory: Article[] = [];

  public categoryName?: string;

  public sc: ContentScrollConfig = {} as any;

  private subs = new Subscription();

  constructor(private readonly contentService: ContentService, private readonly activatedRoute: ActivatedRoute, private readonly router: Router) { }

  public ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['category']) {
          this.categoryName = params['category'];
          this.articlesByCategory = this.activatedRoute.snapshot.data['articleCategoryResolver'];
        }
      })
    )
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public navigateTo(author: string, articleId?: string): void {
    this.router.navigate([`/articles/${author}/${articleId}`]);
  }
}
