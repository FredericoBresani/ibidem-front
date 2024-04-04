import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AccountService } from "../account/account.service";
import { User } from "../shared/models/user.model";

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly localStorageService: LocalStorageService, private readonly accountService: AccountService, private readonly router: Router) {}
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userId = this.localStorageService.getUserId();
    const token = this.localStorageService.getAccessToken();
    if (userId && token) {
      this.accountService.getUserById(token, userId).subscribe({
        next: (user: User) => {
          /* empty */
        },
        error: (response) => {
          const message = response.error.message;
          const isUpdateAccountRoute = state.url.indexOf('/account/update/');
          if ((message === 'VALIDATION_EXPIRED' || message === 'USER_NOT_FOUND') && isUpdateAccountRoute !== -1) {
            this.localStorageService.clearLocalStorage();
            window.location.replace('/account/login');
          } else if (message === 'USER_NOT_FOUND' || message === 'VALIDATION_EXPIRED') {
            this.localStorageService.clearLocalStorage();
            window.location.reload();
          }
        }
      })
    } else {
      const isUpdateAccountRoute = state.url.indexOf('/account/update/');
      if (isUpdateAccountRoute !== -1) {
        window.location.replace('/account/login');
      }
      this.localStorageService.clearLocalStorage();
      return true;
    }
    return true;
  }
}
