import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { DestaqueModule } from '../destaque/destaque.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DestaqueModule,
    HomeRoutingModule,
  ],
  providers: []
})
export class HomeModule { }
