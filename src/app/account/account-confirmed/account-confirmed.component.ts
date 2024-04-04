import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.scss']
})
export class AccountConfirmedComponent implements OnInit {

  public subscription = new Subscription();

  public type = '';

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.type = params['type'];
      })
    );
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
