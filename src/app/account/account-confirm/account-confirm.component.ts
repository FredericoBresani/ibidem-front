import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-account-confirm',
  templateUrl: './account-confirm.component.html',
  styleUrls: ['./account-confirm.component.scss']
})
export class AccountConfirmComponent implements OnInit {

  public confirmedAccount: User = {} as any;

  private subs = new Subscription();

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute, private readonly accountService: AccountService) { }

  public ngOnInit(): void {
    this.subs.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id'] && params['token']){
          this.confirmedAccount = this.activatedRoute.snapshot.data['accountConfirmResolver'];
        }
      })
    );
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
