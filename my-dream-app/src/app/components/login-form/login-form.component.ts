import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';
import {UsuarioService} from "../../services/usuario.service";
import swal from 'sweetalert2';

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
          this.checkEmailIsAvailable.bind(this)
        ],
        updateOn: "blur"
      }),
    telefone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(14)
      ],
      updateOn: "change"
    }),
    senha: new FormControl('', [Validators.required, this.checkForcaSenha]),
    repetirSenha: new FormControl('', [
      Validators.required,
      this.checkSenhaIgual.bind(this)
    ])
  });

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  signIn(){
    this.usuarioService.signin(this.signinForm.value.usuario, this.signinForm.value.senha)
      .catch(q => {
        q.errors.forEach(e => this.signinForm.controls[e.field].setErrors({message: e.message}));
        swal("Algo deu errado", q.genericError ? q.genericError : 'Verifique os campos marcados com erro', 'error');
      });
  }

  signUp(){
    console.log(this.signupForm.value)
  }

  checkEmailIsAvailable(control) : Promise<ValidationErrors | null> {
    return this.usuarioService.isEmailAvailable(control.value)
      .then(r => r ? null : {message: 'Esse e-mail já está em uso'})
      .catch(q => ({message: 'Ocorreu um erro interno, tente novamente por favor'}));
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
