import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { RouterModule } from '@angular/router';
import { NavigationService } from './navigation.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavBarComponent,
    NavigationDropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
  ],
  providers: [NavigationService]
})
export class NavigationModule { }
