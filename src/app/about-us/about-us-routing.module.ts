import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { UserExistsGuard } from "../auth/auth-user-exists.guard";

const routes: Route[] = [
  {
    path: 'purpose',
    canActivate: [UserExistsGuard],
    children: [
      {
        path: '',
        component: AboutComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
