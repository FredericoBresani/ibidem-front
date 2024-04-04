import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormErrors } from '../../models/form-errors.model';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit, OnChanges {

  @Input() public formErrors: FormErrors[] = [] as any;

  constructor() {/**/}

  public ngOnInit(): void {/**/}

  public ngOnChanges(changes: SimpleChanges): void {/**/}

}
