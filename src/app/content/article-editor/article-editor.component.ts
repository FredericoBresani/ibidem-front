import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  public author?: string | null;

  constructor(private readonly localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.author = this.localStorageService.getIsAuthor();
    this.toggleEditionElements();
  }

  public toggleEditionElements(): void {
    document.querySelector('.article-elements')?.classList.toggle('article-elements-hidden');
  }

}
