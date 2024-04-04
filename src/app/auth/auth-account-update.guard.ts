import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AccountService } from "../account/account.service";
import { User } from "../shared/models/user.model";
import { AlertService } from "../alert/alert.service";
import { AlertModel } from "../shared/models/alert.model";

@Injectable()
export class AccountUpdateGuard implements CanActivate {
  public alert: AlertModel = {} as any;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    ) { /* empty */}
  public canActivate(route: ActivatedRouteSnapshot): boolean {
    this.localStorageService.clearLocalStorage();
    this.accountService.confirmAccountUpdate(route.params['token'], route.params['id']).subscribe({
      next: (user: User) => {
        if (user._id) {
          return true;
        }
        return false;
      },
      error: (response) => {
        if (response?.error?.message === 'VALIDATION_EXPIRED') {
          this.alert = { key: response.error.message, type: 'error' };
          this.alertService.messageSubject.next(this.alert);
          this.router.navigate(['/account/login']);
        }
        return false;
      }
    })
    return true;
  }
}
