import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  constructor(private readonly router: Router) { }

  public ngOnInit(): void {
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
