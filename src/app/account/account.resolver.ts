import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { User } from "../shared/models/user.model";
import { AccountService } from "./account.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AccountResolver implements Resolve<User> {
  constructor(private readonly accountService: AccountService, private readonly localStorageService: LocalStorageService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const token = this.localStorageService.getAccessToken();
    const id = route.params['id'];
    return this.accountService.getUserById(token || 'no_token', id).pipe(
      map((user) => { return user })
    );
  }
}
