import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPageComponent } from './content-page/content-page.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleResolver } from './article.resolver';
import { ContentService } from './content.service';
import { SharedModule } from '../shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { CourseUnfinishedPopupComponent } from './course-unfinished-popup/course-unfinished-popup.component';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
@NgModule({
  declarations: [
    ContentPageComponent,
    ArticleComponent,
    ArticleEditorComponent,
    ArticleFormComponent,
    SingleCategoryComponent,
    CourseUnfinishedPopupComponent,
    CourseComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CourseUnfinishedPopupComponent
  ],
  providers: [ArticleResolver, ContentService]
})
export class ContentModule { }
