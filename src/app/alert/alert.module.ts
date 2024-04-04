import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertService } from './alert.service';


@NgModule({
  declarations: [
    AlertsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertsComponent],
})
export class AlertModule { }
