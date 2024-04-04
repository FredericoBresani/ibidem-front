import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormErrors } from 'src/app/shared/models/form-errors.model';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertModel } from 'src/app/shared/models/alert.model';
@Component({
  selector: 'app-account-password-lost',
  templateUrl: './account-password-lost.component.html',
  styleUrls: ['./account-password-lost.component.scss']
})
export class AccountPasswordLostComponent implements OnInit {

  public recoverForm: FormGroup;

  public formErrors: FormErrors[] = [] as any;

  public alert: AlertModel = {} as any;

  public showFormErrors = false;

  public subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly alertService: AlertService
    ) {
    this.recoverForm = this.setupForm();
  }

  public ngOnInit(): void {/**/}

  public showFormError(): void {
    if (this.showFormErrors) {
      this.showFormErrors = false;
      return;
    } else {
      this.showFormErrors = true;
    }
    this.formErrors = [];
    const emailErrors = this.recoverForm.controls['email'].errors;
    if (emailErrors){
      if (emailErrors['required']){
        this.formErrors.push({ value: 'required', error: 'Email é obrigatório;' });
      }
      else if (emailErrors?.['email']) {
        this.formErrors.push({ value: 'email', error: 'Email inválido;' });
      }
    }
  }

  public onSubmit(): void {
    this.subscription.add(
      this.accountService.sendRecoverEmail(this.recoverForm.controls['email'].value).subscribe({
        next: (user: User) => {
          if (user) {
            this.router.navigate(['/account/confirmed/send-recover']);
          }
        },
        error: (response) => {
          this.alert = { key: response.error.message, type: 'error' };
          this.alertService.messageSubject.next(this.alert);
        }
      })
    );
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
