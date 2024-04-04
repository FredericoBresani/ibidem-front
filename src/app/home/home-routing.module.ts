import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Route } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DestaqueSectionComponent } from "../destaque/destaque-section/destaque-section.component";
import { RouterModule } from "@angular/router";
import { UserExistsGuard } from "../auth/auth-user-exists.guard";

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [UserExistsGuard],
    children: [
      {
        path: '',
        component: DestaqueSectionComponent,
      }
    ]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [UserExistsGuard],
    children: [
      {
        path: '',
        component: DestaqueSectionComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
})
export class HomeRoutingModule {}
