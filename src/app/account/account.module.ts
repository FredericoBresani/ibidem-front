import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountLoginFormComponent } from './account-login-form/account-login-form.component';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { AccountConfirmComponent } from './account-confirm/account-confirm.component';
import { AccountConfirmedComponent } from './account-confirmed/account-confirmed.component';
import { AccountPasswordUpdatedComponent } from './account-password-updated/account-password-updated.component';
import { AccountMainComponent } from './account-main/account-main.component';
import { AuthModule } from '../auth/auth.module';
import { AccountPasswordLostComponent } from './account-password-lost/account-password-lost.component';
import { AccountResendRegisterVerifyComponent } from './account-resend-register-verify/account-resend-register-verify.component';



@NgModule({
  declarations: [
    AccountFormComponent,
    AccountLoginFormComponent,
    AccountConfirmComponent,
    AccountConfirmedComponent,
    AccountPasswordUpdatedComponent,
    AccountMainComponent,
    AccountPasswordLostComponent,
    AccountResendRegisterVerifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule,
    AccountRoutingModule,
    AuthModule,
  ],
  providers: [AccountService, AccountResolver]
})
export class AccountModule { }
