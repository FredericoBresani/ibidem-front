import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { UserAndToken } from 'src/app/shared/models/user-and-token.model';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-account-login-form',
  templateUrl: './account-login-form.component.html',
  styleUrls: ['./account-login-form.component.scss']
})
export class AccountLoginFormComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;

  public alert: AlertModel = {} as any;

  public userLogin?: UserLogin;

  public subs = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly alertService: AlertService,
    ) {
    this.loginForm = this.setupForm();
  }

  public ngOnInit(): void { /*empty*/ }

  public ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  public onSubmit(): void {
      this.userLogin = { ...this.userLogin, ...this.loginForm.value };
      this.subs.add(
        this.accountService.loginUser(this.userLogin!).subscribe({
          next: (userAndToken: UserAndToken) => {
            this.localStorageService.setUserName(userAndToken.user.username);
            this.localStorageService.setUserIsAuthor(userAndToken.user.author);
            this.localStorageService.setUserId(userAndToken.user._id!);
            this.localStorageService.setAccessToken(userAndToken.access_token);
            window.location.replace('/home');
          },
          error: (response) => {
            this.alert = { key: response.error.message, type: 'error' };
            this.alertService.messageSubject.next(this.alert);
          },
          complete: () => { /*empty*/ }
        })
      )
  }

  public togglePassword(event: Event): void {
    const passwordField = (event.target as HTMLElement).parentElement?.previousElementSibling;
    if (passwordField?.getAttribute('type') === 'password') {
      passwordField.setAttribute('type', 'text');
    } else {
      passwordField?.setAttribute('type', 'password');
    }
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  public setupForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
