import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {formErrors} from "../../utils/form-errors";

@Component({
  selector: 'app-show-errors-input',
  templateUrl: './show-errors-input.component.html',
  styleUrls: ['./show-errors-input.component.scss']
})
export class ShowErrorsInputComponent implements OnInit, AfterContentInit {

  @Input() formInput : FormControl;

  errors: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.formInput.valueChanges.subscribe(this.refreshErrors);
    this.refreshErrors();
  }

  refreshErrors = () => {
    console.log('vindo ver erros')
    this.errors = [];
    for(let error in this.formInput.errors){
      if(formErrors[error])
        this.errors.push(formErrors[error]());
      else if(this.formInput.errors[error].constructor === String)
        this.errors.push(this.formInput.errors[error]);
      else if(this.formInput.errors[error].constructor === Object && this.formInput.errors[error].message)
        this.errors.push(this.formInput.errors[error].message);
    }
  }
}
