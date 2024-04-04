import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RequestService } from "../services/request.service";
import { User } from "../models/user.model";
import { UserLogin } from "../models/user-login.model";
import { UserAndToken } from "../models/user-and-token.model";
import { LocalStorageService } from "src/app/local-storage/local-storage.service";
import { PasswordRecover } from "../models/user-recover-password.model";

@Injectable({
  providedIn: 'root'
})
export class AccountClient {

  public endPoint = 'user';
  constructor(private readonly requestService: RequestService, private readonly localStorageService: LocalStorageService) {}

  public getAllUsers(): Observable<User[]> {
    return this.requestService.get(this.endPoint);
  }

  public getUserById(token: string, userId: string): Observable<User> {
    return this.requestService.getById<User, {id: string}>(
        `${this.endPoint}/by-id`,
        { Authorization: 'Bearer '+token },
        { id: userId }
    );
  }

  public confirmAccountRegistry(token: string, userId: string): Observable<User> {
    return this.requestService.put<any, User>(`${this.endPoint}/confirm-registry`,
      {},
      { Authorization: 'Bearer '+token },
      { id: userId },
    );
  }

  public confirmAccountUpdate(token: string, userId: string): Observable<User> {
    return this.requestService.put<any, User>(`${this.endPoint}/confirm-update`,
      {},
      { Authorization: 'Bearer '+token },
      { id: userId }
    );
  }

  public updateUserById(userId: string, user: User): Observable<User> {
    return this.requestService.put<User, User>(`${this.endPoint}/update-account/${userId}`, user,
      {
        Authorization: 'Bearer '+this.localStorageService.getAccessToken(),
      }
    );
  }

  public loginUser(login: UserLogin): Observable<UserAndToken> {
    return this.requestService.post<UserLogin, UserAndToken>(`${this.endPoint}/auth/login`, login);
  }

  public registerUser(user: User): Observable<User> {
    return this.requestService.post<User, User>(this.endPoint, user);
  }

  public deleteAccount(userId: string): Observable<void> {
    return this.requestService.delete<{userId: string}, void>(`${this.endPoint}`, { userId });
  }

  public recoverAccountPassword(recover: PasswordRecover, token: string, userId: string): Observable<void> {
    return this.requestService.put<PasswordRecover, void>(`${this.endPoint}/recover-password`,
      recover,
      { Authorization: 'Bearer '+token },
      { id: userId }
    );
  }

  public sendRecoverEmail(email: string): Observable<User> {
    return this.requestService.put<{ email: string }, User>(`${this.endPoint}/send-recover-email`, { email });
  }

  public resendRegistryVerification(userId: string): Observable<void> {
    return this.requestService.put<{ id: string }, void>(`${this.endPoint}/resend-register-verification`, { id: userId });
  }

  public verifyTokenRecover(token: string, userId: string): Observable<User> {
    return this.requestService.get<User, { userId: string }>(`${this.endPoint}/verify/token/id`,
      { userId },
      {
        Authorization: 'Bearer '+token,
      }
    );
  }
}
