import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountClient } from '../shared/client/account.client';
import { User } from "../shared/models/user.model";
import { UserLogin } from "../shared/models/user-login.model";
import { UserAndToken } from "../shared/models/user-and-token.model";
import { PasswordRecover } from "../shared/models/user-recover-password.model";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly accountClient: AccountClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.accountClient.getAllUsers();
  }

  public getUserById(token: string, id: string): Observable<User> {
    return this.accountClient.getUserById(token, id);
  }

  public updateUserById(userId: string, user: User): Observable<User> {
    return this.accountClient.updateUserById(userId, user);
  }

  public confirmAccountRegistry(token: string, userId: string): Observable<User> {
    return this.accountClient.confirmAccountRegistry(token, userId);
  }

  public confirmAccountUpdate(token: string, userId: string): Observable<User> {
    return this.accountClient.confirmAccountUpdate(token, userId);
  }

  public loginUser(login: UserLogin): Observable<UserAndToken> {
    return this.accountClient.loginUser(login);
  }

  public registerUser(user: User): Observable<User> {
    return this.accountClient.registerUser(user);
  }

  public deleteAccount(userId: string): Observable<void> {
    return this.accountClient.deleteAccount(userId);
  }

  public recoverAccountPassword(recover: PasswordRecover, token: string, userId: string): Observable<void> {
    return this.accountClient.recoverAccountPassword(recover, token, userId);
  }

  public sendRecoverEmail(email: string): Observable<User> {
    return this.accountClient.sendRecoverEmail(email);
  }

  public resendRegistryVerification(userId: string): Observable<void> {
    return this.accountClient.resendRegistryVerification(userId);
  }

  public verifyTokenRecover(token: string, id: string): Observable<User> {
    return this.accountClient.verifyTokenRecover(token, id);
  }
}
