import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { ArticleApiService } from "src/app/shared/services/article-api.service";
import { ContentService } from "./content.service";
import { Article, articleResolverData } from "../shared/models/article.model";

@Injectable({
    providedIn: 'root',
})
export class ArticleResolver implements Resolve<articleResolverData> {
    constructor(private readonly articleAPI: ArticleApiService, private readonly contentService: ContentService, private readonly ac: ActivatedRoute) {}

    public resolve(route: ActivatedRouteSnapshot): articleResolverData {
        const id = route.params['id'];
        const author = route.params['author'];
        return {
          articleContent: this.articleAPI.getArticle(author, id),
          articleInfos: this.contentService.getArticleById(id)
        }
    }
}
