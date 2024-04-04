import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-resend-register-verify',
  templateUrl: './account-resend-register-verify.component.html',
  styleUrls: ['./account-resend-register-verify.component.scss']
})
export class AccountResendRegisterVerifyComponent implements OnInit {

  public userId = '';

  public alert: AlertModel = {} as any;

  public subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly alertService: AlertService,
    ) { }

  public ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
      })
    );
  }

  public onSubmit(): void {
    this.subscription.add(
      this.accountService.resendRegistryVerification(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/account/confirmed/resend']);
        },
        error: (response) => {
          this.alert = { key: response.error.message, type: 'error' };
          this.alertService.messageSubject.next(this.alert);
        }
      })
    );
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
