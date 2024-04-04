import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ArticleApiService {
    constructor(private readonly httpClient: HttpClient) {}

    public getArticle(author: string, id: string): Observable<JSON> {
        if (!author || !id) {
            return this.httpClient.get<JSON>(`./assests/article-api/error.json`);
        }
        return this.httpClient.get<JSON>(`./assets/article-api/${author}/${id}.json`);
    }
}