import { Component, OnInit } from '@angular/core';
import { commentsOptions } from '../options/comments-option';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public comments = commentsOptions;

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {}

}
