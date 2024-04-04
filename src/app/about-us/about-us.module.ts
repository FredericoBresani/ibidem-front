import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AboutUsRoutingModule } from './about-us-routing.module';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ],
  exports: []
})
export class AboutUsModule { }
