import { Component, OnInit } from '@angular/core';
import { footerOptions } from '../options/footer-options';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public footerOptions = footerOptions;

  constructor() { }

  public ngOnInit(): void {
  }

  public navigateInstagram(): void {
    window.open('https://www.instagram.com/grupo.ibidem/?hl=en');
  }

}
