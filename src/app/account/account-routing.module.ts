import { NgModule } from "@angular/core";
import { Route } from '@angular/router';
import { CommonModule } from "@angular/common";
import { AccountFormComponent } from "./account-form/account-form.component";
import { AccountLoginFormComponent } from "./account-login-form/account-login-form.component";
import { AccountMainComponent } from "./account-main/account-main.component";
import { AccountConfirmComponent } from "./account-confirm/account-confirm.component";
import { AccountResolver } from "./account.resolver";
import { RouterModule } from "@angular/router";
import { AuthModule } from "../auth/auth.module";
import { LoginGuard } from "../auth/auth-login.guard";
import { AgreementComponent } from "../shared/components/agreement/agreement.component";
import { AccountConfirmationGuard } from "../auth/auth-account-confirm.guard";
import { AccountConfirmResolver } from "./account-confirm.resolver";
import { UserExistsGuard } from "../auth/auth-user-exists.guard";
import { AccountConfirmedComponent } from "./account-confirmed/account-confirmed.component";
import { AccountUpdateGuard } from "../auth/auth-account-update.guard";
import { AccountPasswordUpdatedComponent } from "./account-password-updated/account-password-updated.component";
import { AccountPasswordLostComponent } from "./account-password-lost/account-password-lost.component";
import { NotLoggedInGuard } from "../auth/auth-not-logged.guard";
import { AccountResendRegisterVerifyComponent } from "./account-resend-register-verify/account-resend-register-verify.component";
import { TokenRecoverGuard } from "../auth/auth-token-recover.guard";

const routes: Route[] = [
  {
    path: 'account',
    component: AccountMainComponent,
    children: [
      {
        path: 'login',
        canActivate: [NotLoggedInGuard],
        component: AccountLoginFormComponent
      },
      {
        path: 'register',
        canActivate: [NotLoggedInGuard],
        component: AccountFormComponent,
      },
      {
        path: 'confirm-registry/:token/:id',
        canActivate: [AccountConfirmationGuard],
        component: AccountConfirmComponent,
        resolve: { accountConfirmResolver: AccountConfirmResolver }
      },
      {
        path: 'resend-registry-confirm/:id',
        canActivate: [NotLoggedInGuard],
        component: AccountResendRegisterVerifyComponent
      },
      {
        path: 'update/:id',
        canActivate: [UserExistsGuard],
        component: AccountFormComponent,
        resolve: { accountResolver: AccountResolver }
      },
      {
        path: 'confirm-update/:token/:id',
        canActivate: [AccountUpdateGuard],
        component: AccountConfirmComponent,
        resolve: { accountConfirmResolver: AccountConfirmResolver }
      },
      {
        path: 'confirmed/:type',
        component: AccountConfirmedComponent,
      },
      {
        path: 'lost-account',
        canActivate: [NotLoggedInGuard],
        component: AccountPasswordLostComponent,
      },
      {
        path: 'recover-password/:token/:id',
        canActivate: [TokenRecoverGuard],
        component: AccountPasswordUpdatedComponent,
      },
      {
        path: 'confirm-recover-password/:token/:id',
        canActivate: [TokenRecoverGuard],
        component: AccountConfirmComponent,
        resolve: { accountConfirmResolver: AccountConfirmResolver }
      }
    ]
  },
  {
    path: 'agreement-terms',
    component: AgreementComponent,
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
