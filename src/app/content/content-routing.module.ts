import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ContentPageComponent } from "./content-page/content-page.component";
import { CommonModule } from "@angular/common";
import { ArticleComponent } from "./article/article.component";
import { ArticleResolver } from "./article.resolver";
import { SingleCategoryComponent } from "./single-category/single-category.component";
import { ArticleCategoryResolver } from "./article-category.resolver";
import { UserExistsGuard } from "../auth/auth-user-exists.guard";
import { CourseComponent } from "./course/course.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CourseResolver } from "./course.resolver";

const routes: Route[] = [
    {
      path: 'content',
      component: ContentPageComponent,
      canActivate: [UserExistsGuard]
    },
    {
      path: 'courses',
      component: CoursesListComponent,
      canActivate: [UserExistsGuard]
    },
    {
      path: 'courses/:id',
      component: CourseComponent,
      canActivate: [UserExistsGuard],
      resolve: { courseResolver: CourseResolver }
    },
    {
      path: 'articles/:author/:id', //an specific article into content-page
      component: ArticleComponent,
      canActivate: [UserExistsGuard],
      resolve : { articleResolver: ArticleResolver }
    },
    {
      path: 'category/articles/:category',
      component: SingleCategoryComponent,
      canActivate: [UserExistsGuard],
      resolve: { articleCategoryResolver: ArticleCategoryResolver }
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class ContentRoutingModule{}
