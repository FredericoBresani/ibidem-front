import { Injectable } from "@angular/core";

const items = {
  user_name: 'IBD:username',
  user_is_author: 'IBD:author',
  user_id: 'IBD:user_id',
  access_token: 'IBD:token'
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public userName?: string;

  public userIsAuthor?: boolean;

  public userId?: string;

  public access_token?: string;

  constructor() { /* empty */ }

  public setUserName(name: string): void {
    this.userName = name;
    localStorage.setItem(items.user_name, this.userName);
  }

  public setUserIsAuthor(isAuthor: boolean): void {
    this.userIsAuthor = isAuthor;
    localStorage.setItem(items.user_is_author, isAuthor ? '1' : '0');
  }

  public setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem(items.user_id, this.userId);
  }

  public setAccessToken(token: string): void {
    this.access_token = token;
    localStorage.setItem(items.access_token, this.access_token);
  }

  public getUserId(): string | null {
    return localStorage.getItem(items.user_id);
  }

  public getUserName(): string | null {
    return localStorage.getItem(items.user_name);
  }

  public getIsAuthor(): string | null {
    return localStorage.getItem(items.user_is_author);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(items.access_token);
  }

  public removeUserId(): void {
    localStorage.removeItem(items.user_id);
  }

  public removeIsAuthor(): void {
    localStorage.removeItem(items.user_is_author);
  }

  public removeUserName(): void {
    localStorage.removeItem(items.user_name);
  }

  public removeAccessToken(): void {
    localStorage.removeItem(items.access_token);
  }

  public clearLocalStorage(): void {
    this.removeAccessToken();
    this.removeIsAuthor();
    this.removeUserId();
    this.removeUserName();
  }

}
