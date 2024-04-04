import { Component, OnInit, Output } from '@angular/core';
import { navBarOptions } from '../options/nav-options';
import { LocalStorageUser } from 'src/app/shared/models/localstorage-user.model';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-dropdown',
  templateUrl: './navigation-dropdown.component.html',
  styleUrls: ['./navigation-dropdown.component.scss']
})
export class NavigationDropdownComponent implements OnInit {

  public user?: LocalStorageUser;

  public options = navBarOptions;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    ) { }

  public ngOnInit(): void {
    this.user  = {
      ...this.user,
      ...{
        name: this.localStorageService.getUserName(),
        author: this.localStorageService.getIsAuthor(),
        _id: this.localStorageService.getUserId(),
      }
    }
  }

  public logout(): void {
    this.localStorageService.removeIsAuthor();
    this.localStorageService.removeUserName();
    this.localStorageService.removeUserId();
    delete this.user;
    this.router.navigate(['/home']);
  }

  public toggleDropdown(): void {
    const nav = document.querySelector('.nav-links');
    nav?.classList.toggle('nav-links-dropdown');
    if (document.getElementById("account-dropdown") !== null){
        if (document.getElementById("account-dropdown")?.getAttribute('class') == "account-dropdown-hidden account-dropdown-back"
          && document.getElementById("nav-links-list")?.getAttribute('class') == "nav-links nav-links-dropdown"){
            document.getElementById("account-dropdown")?.setAttribute('class', 'account-dropdown-hidden');
      }
    }
  }

  public activateAccountDropDown(event: Event): void {
    if (event.type === 'mouseover') {
      const nav = document.querySelector('.nav-links');
      if (nav?.getAttribute('class') === 'nav-links nav-links-dropdown') {
        this.toggleDropdown();
      }
      document.querySelector('.account-dropdown-hidden')?.classList.toggle('account-dropdown-back');
    }
  }

  public deactivateAccountDropDown(): void {
    document.querySelector('.account-dropdown-hidden')?.classList.toggle('account-dropdown-back');
  }

  public toggleNavLinks(): void {
    const nav = document.querySelector('.nav-links')!;
    if (document.getElementById("nav-links-list")?.getAttribute('class') == "nav-links nav-links-dropdown"){
      nav.classList.toggle('nav-links-dropdown');
    }
  }
}
