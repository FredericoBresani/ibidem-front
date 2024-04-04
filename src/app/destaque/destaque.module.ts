import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestaqueSectionComponent } from './destaque-section/destaque-section.component';
import { RouterModule, Route } from '@angular/router';
import { ContentModule } from '../content/content.module';@NgModule({
  declarations: [
    DestaqueSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContentModule,
  ],
  exports: [
    DestaqueSectionComponent
  ]
})
export class DestaqueModule { }
