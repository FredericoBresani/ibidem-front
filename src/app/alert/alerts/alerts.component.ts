import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { AlertService } from '../alert.service';
import { alertMessageOptions } from '../options/alert-message.options';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

  public showAlert = false;

  public alert: { message: string; color: string; type: string; right: number } = {} as any;

  public counter = 0;

  public class = 'alert-body';

  public alertOpacity = 0;

  public subscription = new Subscription();

  constructor(private readonly alertService: AlertService) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.alertService.messageSubject.subscribe((alert: AlertModel) => {
        this.alert.message = alertMessageOptions[alert.key];
        this.alert.type = alert.type;
        if (alert.type === 'error') {
          this.alert.color = '#dc6a19';
        }
        else if (alert.type === 'success') {
          this.alert.color = '#839e3e';
        }
        this.activateAlert();
      }),
    );
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public activateAlert(): void {
    this.showAlert = true;
    this.subscription.add(
      new Observable<number>((subscriber) => {
        subscriber.next(this.alert.right = 0.4);
        this.alertOpacity++;
        subscriber.complete();
      }).subscribe((n: number) => {
        if (n) this.deactivateAlert();
      }),
    );
  }

  public deactivateAlert(): void {
    setTimeout(() => {
      this.subscription.add(
        new Observable<number>((subscriber) => {
          subscriber.next(this.alertOpacity = this.alertOpacity - 1);
          subscriber.complete();
        }).subscribe((n: number) => {
          this.alert.right = -20;
          setTimeout(() => {
            this.showAlert = false;
          }, 500)
        }),
      );
    }, 3800);
  }
}
