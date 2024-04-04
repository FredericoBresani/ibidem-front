import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { PasswordRecover } from 'src/app/shared/models/user-recover-password.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormErrors } from 'src/app/shared/models/form-errors.model';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertModel } from 'src/app/shared/models/alert.model';

@Component({
  selector: 'app-account-password-updated',
  templateUrl: './account-password-updated.component.html',
  styleUrls: ['./account-password-updated.component.scss']
})
export class AccountPasswordUpdatedComponent implements OnInit {

  public recoverForm: FormGroup;

  public recoverBody: PasswordRecover = {} as any;

  public formErrors: FormErrors[] = [] as any;

  public alert: AlertModel = {} as any;

  public showFormErrors = false;

  public showPassAlert = false;

  public subscription = new Subscription();

  public token = '';

  public userId = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly alertService: AlertService,
    ) {
    this.recoverForm = this.setupForm();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.token = params['token'];
        this.userId = params['id'];
      }),
    );
  }

  public showFormError(): void {
    if (this.showFormErrors) {
      this.showFormErrors = false;
      return;
    } else {
      this.showFormErrors = true;
    }
    this.formErrors = [];
    const passwordErrors = this.recoverForm.controls['password'].errors;
    if (passwordErrors){
      if (passwordErrors['required']){
        this.formErrors.push({ value: 'required', error: 'A senha é obrigatória; '});
      }
      else if (passwordErrors['minlength']){
        this.formErrors.push({ value: 'minlength', error: 'A senha deve ter um mínimo de 8 caracters; '});
      }
      else if (passwordErrors['maxlength']){
        this.formErrors.push({ value: 'maxlength', error: 'A senha deve ter um máximo de 20 caracters; '});
      }
    }
    if (this.recoverForm.controls['password_confirm'].value != this.recoverForm.controls['password'].value) {
      this.formErrors.push({ value: 'nomatch', error: 'As senhas precisam ser iguais; '});
    }
  }

  public togglePassword(event: Event): void {
    const passwordField = (event.target as HTMLElement).parentElement?.previousElementSibling;
    if (passwordField?.getAttribute('type') === 'password') {
      passwordField.setAttribute('type', 'text');
    } else {
      passwordField?.setAttribute('type', 'password');
    }
  }

  public togglePasswordAlert(): void {
    if (this.showPassAlert) {
      this.showPassAlert = false;
    } else {
      this.showPassAlert = true;
    }
  }

  public onSubmit(): void {
    this.recoverBody = this.recoverForm.value;
    this.subscription.add(
      this.accountService.recoverAccountPassword(this.recoverBody, this.token, this.userId).subscribe({
        next: () => {
          this.router.navigate(['/account/confirmed/recover']);
        },
        error: (response) => {
          if (response.error.message === 'VALIDATION_EXPIRED'){
            this.alert = { key: response.error.message, type: 'error' };
            this.alertService.messageSubject.next(this.alert);
            this.router.navigate(['/account/login']);
          }
        }
      }),
    );
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]
      ],
      password_confirm: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]
      ],
    });
  }
}
