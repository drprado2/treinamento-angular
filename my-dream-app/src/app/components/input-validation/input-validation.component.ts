import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, AfterContentInit, OnChanges {

  @Input() myFormControl : FormControl;
  @Input() isRequired : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log('vejaaa', this.myFormControl, this.isRequired)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PASSANDO PELO COLOCADOR DE ERRO', this.myFormControl, changes)
  }

}
