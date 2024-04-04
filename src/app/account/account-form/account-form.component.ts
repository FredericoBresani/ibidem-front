import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { AccountService } from '../account.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { FormErrors } from 'src/app/shared/models/form-errors.model';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnDestroy {

  public accountForm: FormGroup;

  public user?: User;

  public alert: AlertModel = {} as any;

  public agreement = false;

  public showPassAlert = false;

  public showFormErrors = false;

  public showPopup = false;

  public formErrors: FormErrors[] = [] as any;

  public subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
    private readonly alertService: AlertService,
    ) {
    this.accountForm = this.setupForm();
   }

  public ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id']) {
          this.user = this.activatedRoute.snapshot.data['accountResolver'];
          if (this.user) {
              this.fillForm(this.user);
          }
        }
      })
    )
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public confirmAgreement(): void {
    if (this.agreement) {
      this.agreement = false
    } else {
      this.agreement = true;
    }
  }

  public navigateTo(url: string): void {
    this.router.navigate([url])
  }

  public fillForm(user: User): void {
    const date = new Date(user.birth_date ? user.birth_date : '');
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() + 1 < 10 ? '0'+(date.getDate() + 1) : date.getDate() + 1;
    this.accountForm.patchValue({
      temp_email: user.email,
      temp_username: user.username,
      temp_birth_date: user.birth_date ? year+'-'+month+'-'+day : '',
      temp_receive_emails: user.receive_emails,
    });
  }

  public togglePopup(): void {
    if (this.showPopup) {
      this.showPopup = false;
    } else {
      this.showPopup = true;
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

  public showFormError(): void {
    if (this.showFormErrors) {
      this.showFormErrors = false;
      return;
    } else {
      this.showFormErrors = true;
    }
    this.formErrors = [];
    const emailErrors = this.accountForm.controls['temp_email'].errors;
    const usernameErrors = this.accountForm.controls['temp_username'].errors;
    const passwordErrors = this.accountForm.controls['password'].errors;
    const tempPasswordErrors = this.accountForm.controls['temp_password'].errors;
    if (emailErrors){
      if (emailErrors['required']){
        this.formErrors.push({ value: 'required', error: 'Email é obrigatório;' });
      }
      else if (emailErrors?.['email']) {
        this.formErrors.push({ value: 'email', error: 'Email inválido;' });
      }
    }
    if (usernameErrors) {
      if (usernameErrors['required']){
        this.formErrors.push({ value: 'required', error: 'Nome é obrigatório;' });
      }
      else if (usernameErrors['minlength']){
        this.formErrors.push({ value: 'minlength', error: 'Nome deve ter um mínimo de 8 caracters;' });
      }
      else if (usernameErrors['maxlength']){
        this.formErrors.push({ value: 'maxlength', error: 'Nome deve ter um máximo de 20 caraters;' });
      }
    }
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
    if (!this.agreement){
      this.formErrors.push({ value: 'agreement', error: 'É necessário aceitar os termos de acordo;' });
    }
    if (this.user?._id && this.accountForm.controls['temp_password']){
      if (tempPasswordErrors){
        if (tempPasswordErrors['minlength']){
          this.formErrors.push({ value: 'minlength', error: 'A senha deve ter um mínimo de 8 caracters;'})
        }
        else if (tempPasswordErrors['maxlength']){
          this.formErrors.push({ value: 'minlength', error: 'A senha deve ter um máximo de 20 caracters;'});
        }
      }
    }
  }

  public onSubmit(): void {
    if (this.user?._id) {
      const updatedUser = {
        ...this.accountForm.value,
        ...{
          email: this.user.email,
          username: this.user.username,
          author: this.user.author,
          avocados: this.user.avocados,
        }
      }
      this.subscription.add(
        this.accountService.updateUserById(this.user?._id, updatedUser).subscribe({
          next: (user: User) => {
            this.navigateTo('/account/confirmed/update')
          },
          error: (response) => {
            this.alert = { key: response.error.message, type: 'error' };
            this.alertService.messageSubject.next(this.alert);
          },
          complete: () => {/**/}
        })
      );
    } else {
      this.user = {
        ...this.user,
        ...this.accountForm.value,
        ...{
          author: false,
          avocados: 0,
          register_date: new Date(),
          confirmed: false,
        }
      };
      this.subscription.add(
        this.accountService.registerUser(this.user!).subscribe({
          next: (user: User) => {
            this.navigateTo('/account/confirmed/register');
          },
          error: (response) => {
            this.alert = { key: response.error.message, type: 'error' };
            this.alertService.messageSubject.next(this.alert);
          },
          complete: () => {/**/}
        })
      );
    }
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      temp_email: ['', [Validators.required, Validators.email]],
      temp_username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      temp_password: ['', [Validators.minLength(8), Validators.maxLength(20)]],
      temp_birth_date: [''],
      temp_receive_emails: [false]
    });
  }

  public deleteAccount(id?: string): void {
    this.accountService.deleteAccount(id!).subscribe({
      next: () => {
        this.localStorageService.clearLocalStorage();
        window.location.replace('/home');
      }
    })
  }
}
