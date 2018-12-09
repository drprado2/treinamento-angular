import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  signinForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    lembrarMe: new FormControl(true),
  });

  signupForm = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      this.isValidUserName
    ]),
    email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
        ],
        asyncValidators: [
          this.checkEmailIsAvailable
        ],
        updateOn: "blur"
      }),
    telefone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(14)
      ],
      asyncValidators: [
        this.checkTelefoneIsAvailable
      ],
      updateOn: "blur"
    }),
    senha: new FormControl('', [Validators.required, this.checkForcaSenha]),
    repetirSenha: new FormControl('', [
      Validators.required,
      this.checkSenhaIgual.bind(this)
    ])
  });

  constructor() { }

  ngOnInit() {
  }

  onHover(){
    console.log('Usuario erros', this.signinForm.controls.usuario.invalid, this.signinForm.controls.usuario.errors)
    console.log('Todos erros', this.signinForm.controls)
    // Adicionando erro manualmente
    // this.signinForm.controls.usuario.setErrors({ ...this.signinForm.controls.usuario.errors, 'forced-error': {message: 'teste erro', value: true}})
  }

  onHover2(){
    console.log('Email erros', this.signupForm.controls.email, this.signupForm.controls.email.invalid, this.signinForm.controls.usuario.errors)
    console.log('CAMPO EMAIL PENDENTE', this.signupForm.controls)

  }

  signIn(){
    console.log(this.signinForm.value)
    console.log('saca', this.signinForm, this.signinForm)
  }

  signUp(){
    console.log(this.signupForm.value)
  }

  checkEmailIsAvailable(control) : Promise<ValidationErrors | null> {
    console.log('chamou a func asinc')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('RESOLVENDO FUNC')
        resolve({message: 'Esse e-mail já está em uso'});
        }, 4000);
    })
  }

  checkTelefoneIsAvailable(control) : Promise<ValidationErrors | null> {
    console.log('chamou a func asinc')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('RESOLVENDO FUNC')
        resolve(null);
      }, 4000);
    })
  }

  checkForcaSenha(control) : ValidationErrors | null {
    const containsNumber = control.value.match(/[0-9]/g);
    const constainsUppercaseOrSpecial = control.value.match(/[A-Z!@#$%¬&\*\(\)\[\]]/g);
    const message = `A senha deve possuir
       ${!containsNumber ? ' pelo menos 1 número' : ''}
       ${!constainsUppercaseOrSpecial ? ' pelo menos 1 caracter especial ou maiúsculo' : ''}`;

    return !containsNumber || !constainsUppercaseOrSpecial ? {message} : null;
  }

  checkSenhaIgual(control) : ValidationErrors | null {
    console.log('vindo cehcar AAA', control, this)
    return !this.signupForm ||
      !this.signupForm.controls.senha.value ||
      this.signupForm.controls.senha.value === control.value
      ? null
      : {message: 'As senhas não são iguais'};
  }

  isValidUserName(control) : ValidationErrors | null {
    const containsSpace = control.value.match(/[ ]/g);
    return containsSpace ? {message: 'O usuário não pode ter espaços'} : null;
  }
}
