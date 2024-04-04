import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Router } from "@angular/router";

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    ) {}

  public canActivate(): boolean {
      if (this.localStorageService.getUserId()){
        this.router.navigate(['/home']);
        return false;
      }
      return true;
  }
}
