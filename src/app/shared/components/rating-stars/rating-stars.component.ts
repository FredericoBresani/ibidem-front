import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, OnChanges {

  @Input() public stars = 0;

  public stars_object: { star: 'half' | 'complete' | 'empty' }[] = [];

  constructor() {/* */}

  public ngOnInit(): void {/* */}

  public ngOnChanges(changes: SimpleChanges): void {
    for (let i = 1; i <= 5; i++) {
      if (this.stars >= 1) {
        this.stars_object.push({ star: 'complete' });
        this.stars--;
      } else if (this.stars > 0) {
        this.stars_object.push({ star: 'half' });
        this.stars = 0;
      } else {
        this.stars_object.push({ star: 'empty' })
      }
    }
  }


}
