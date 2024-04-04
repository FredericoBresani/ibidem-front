import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public switchFlexDirection = false;

  constructor(private readonly router: Router) { }

  public ngOnInit(): void {
    if (window.innerWidth < 730) {
      this.switchFlexDirection = true;
    }
  }

  public navigateTo(): void {
    window.scroll({
      top: 0,
    });
    this.router.navigate(['/courses']);
  }

}
