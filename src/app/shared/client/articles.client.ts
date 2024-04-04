import { Injectable } from "@angular/core";
import { RequestService } from "../services/request.service";
import { Observable } from "rxjs";
import { Article } from "../models/article.model";
import { ArticleFilter } from "../models/article-filter.model";

@Injectable({
    providedIn: 'root'
})
export class ArticlesClient {

    public endPoint = 'articles';
    public constructor(private readonly requestService: RequestService) {}

    public getArticles(filter: ArticleFilter): Observable<Article[]> {
        return this.requestService.get<Article[], unknown>(this.endPoint, filter);
    }

    public getMostViewedArticles(): Observable<Article[]> {
        return this.requestService.get<Article[], null>(`${this.endPoint}/most-viewed`);
    }

    public getArticleCategories(): Observable<string[]> {
        return this.requestService.get<string[], null>(`${this.endPoint}/categories`);
    }

    public getArticleById(id: string): Observable<Article> {
        return this.requestService.get<Article, unknown>(`${this.endPoint}/by-id/${id}`);
    }

    public insertArticle(article: Article): Observable<void> {
        return this.requestService.post<Article, void>(this.endPoint, article);
    }

    public searchArticle(stringToSearch: string): Observable<Article[]> {
        return this.requestService.articleSearch<Article[]>(`${this.endPoint}/search-article`, stringToSearch);
    }

}
