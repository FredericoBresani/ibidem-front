import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../shared/models/article.model';
import { ContentService } from '../content/content.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private readonly contentService: ContentService) { }

  public search(stringToSearch: string): Observable<Article[]> {
    return this.contentService.searchArticle(stringToSearch);
  }
}
