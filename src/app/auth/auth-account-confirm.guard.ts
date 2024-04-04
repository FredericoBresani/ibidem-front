import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AccountService } from "../account/account.service";
import { User } from "../shared/models/user.model";
import { AlertService } from "../alert/alert.service";
import { AlertModel } from "../shared/models/alert.model";

@Injectable()
export class AccountConfirmationGuard implements CanActivate {
  public alert: AlertModel = {} as any;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly alertService: AlertService
    ) { /* empty */}
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.localStorageService.clearLocalStorage();
    if (route.params['token'] && route.params['id']) {
      this.accountService.confirmAccountRegistry(route.params['token'], route.params['id']).subscribe({
        next: (user: User) => {
          if (user._id) {
            return true;
          }
          return false;
        },
        error: (response) => {
          if (response?.error?.message === 'VALIDATION_EXPIRED') {
            this.router.navigate([`/account/resend-registry-confirm/${route.params['id']}`]);
          }
          return false;
        }
      })
    }
    return true;
  }
}
