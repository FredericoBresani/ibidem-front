import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContentService } from '../content.service';
import { ArticleHeader } from 'src/app/shared/models/article-header.model';
import { Article } from 'src/app/shared/models/article.model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article?: { header: ArticleHeader; content: any[]};

  public articleInfos?: Article;

  private subs = new Subscription();

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly contentService: ContentService) {
  }

  public ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id'] && params['author']){
          this.activatedRoute.snapshot.data['articleResolver'].articleContent.subscribe(
            (content: { header: ArticleHeader; content: any[] }) => {
              this.article = content;
          });
          this.activatedRoute.snapshot.data['articleResolver'].articleInfos.subscribe(
            (infos: Article) => {
              this.articleInfos = infos;
            }
          )
        }
      })
    );
  }

}
