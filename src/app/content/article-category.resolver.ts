import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { ContentService } from "./content.service";
import { Article } from "../shared/models/article.model";
import { Resolve } from "@angular/router";
import { ArticleFilter } from "../shared/models/article-filter.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleCategoryResolver implements Resolve<Observable<Article[]>> {

  public filter: ArticleFilter = {};
  constructor (private readonly contentService: ContentService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Article[]> {
    const category = route.params['category'];
    this.filter = { category: category };
    return this.contentService.getArticles(this.filter).pipe(
      map((articles) => { return articles })
    );
  }
}
