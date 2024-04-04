import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/models/article.model';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnChanges {

  @Input() public articleInfos?: Article

  public articleForm: FormGroup;

  public author?: string | null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.articleForm = this.setupForm();
  }

  public ngOnInit(): void {
    this.author = this.localStorageService.getIsAuthor();
    this.setupForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleInfos'].currentValue) {
      this.articleForm.patchValue({
        image: this.articleInfos?.image,
        title: this.articleInfos?.title,
        subtitle: this.articleInfos?.subtitle,
        category: this.articleInfos?.category,
        image_description: this.articleInfos?.image_description,
      })
    }
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      category: ['', Validators.required],
      image_description: [''],
    });
  }

}
