import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  signinForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    lembrarMe: new FormControl(true),
  });

  signupForm = new FormGroup({
    usuario: new FormControl(''),
    email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          control => null
        ],
        asyncValidators: [
          this.validate
        ],
        updateOn: "blur"
      }),
    telefone: new FormControl(''),
    cpf: new FormControl(''),
    senha: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onHover(){
    console.log('Usuario erros', this.signinForm.controls.usuario.invalid, this.signinForm.controls.usuario.errors)
    // Adicionando erro manualmente
    this.signinForm.controls.usuario.setErrors({ ...this.signinForm.controls.usuario.errors, 'forced-error': {message: 'teste erro', value: true}})
  }

  onHover2(){
    console.log('Email erros', this.signupForm.controls.email, this.signupForm.controls.email.invalid, this.signinForm.controls.usuario.errors)
    console.log('CAMPO EMAIL PENDENTE', this.signupForm.controls.email.pending)

  }

  signIn(){
    console.log(this.signinForm.value)
    console.log('saca', this.signinForm, this.signinForm)
  }

  signUp(){
    console.log(this.signupForm.value)
  }

  validate(control) : Promise<ValidationErrors | null> {
    console.log('chamou a func asinc')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('RESOLVENDO FUNC')
        resolve(null);
        }, 4000);
    })
  }
}
