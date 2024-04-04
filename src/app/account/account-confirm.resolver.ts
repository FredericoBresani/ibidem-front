import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { AccountService } from "./account.service";
import { User } from "../shared/models/user.model";
import { UserLogin } from "../shared/models/user-login.model";

@Injectable({
  providedIn: 'root',
})
export class AccountConfirmResolver implements Resolve<User> {
  public userLogin: UserLogin = {} as any;
  constructor(private readonly accountService: AccountService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.params['id'];
    const token = route.params['token'];
    return this.accountService.getUserById(token || 'no_token', id).pipe(
      map((user) => { return user })
    )
  }
}
