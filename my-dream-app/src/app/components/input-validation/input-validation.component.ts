import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit {

  @Input() myFormControl : FormControl;
  @Input() isRequired : boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
