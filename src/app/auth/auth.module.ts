import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './auth-login.guard';
import { AccountConfirmationGuard } from './auth-account-confirm.guard';
import { AccountService } from '../account/account.service';
import { UserExistsGuard } from './auth-user-exists.guard';
import { AccountUpdateGuard } from './auth-account-update.guard';
import { NotLoggedInGuard } from './auth-not-logged.guard';
import { TokenRecoverGuard } from './auth-token-recover.guard';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [LoginGuard, AccountConfirmationGuard, AccountService, UserExistsGuard, AccountUpdateGuard, NotLoggedInGuard, TokenRecoverGuard]
})
export class AuthModule { }
