import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';
import {UsuarioService} from "../../services/usuario.service";
import swal from 'sweetalert2';
import {TabContainerComponent} from "../tab-container/tab-container.component";
import {ModalComponent} from "../modal/modal.component";
import {ButtonType} from "../modal/buttonType.enum";
import {ModalButton} from "../modal/button.modal";
import {ModalSize} from "../modal/modaSize.enum";

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
        this.checkTelefone
      ],
      updateOn: "change"
    }),
    senha: new FormControl('', [Validators.required, this.checkForcaSenha]),
    repetirSenha: new FormControl('', [
      Validators.required,
      this.checkSenhaIgual.bind(this)
    ])
  });

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  @ViewChild(TabContainerComponent) tabContainer: TabContainerComponent;

  @ViewChild(ModalComponent) modalEsqueciMinhaSenha: ModalComponent;

  botoesEsqueciMinhaSenha: ModalButton[] = [
    {callAction: () => this.modalEsqueciMinhaSenha.close(), label: 'Cancelar', type: ButtonType.default},
    {callAction: () => this.esqueciMinhaSenha(), label: 'Confirmar', type: ButtonType.primary},
  ]

  modalSize: ModalSize = ModalSize;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  signIn(){
    this.usuarioService.signin(this.signinForm.value.usuario, this.signinForm.value.senha)
      .catch(q => {
        q.errors.forEach(e => this.signinForm.controls[e.field].setErrors({message: e.message}));
        swal("Algo deu errado!", q.genericError ? q.genericError : 'Verifique os campos marcados com erro', 'error');
      });
  }

  esqueciMinhaSenha(){
    if(this.forgetPasswordForm.pristine){
      this.forgetPasswordForm.controls.email.markAsDirty();
      this.forgetPasswordForm.controls.email.setErrors({required: 'required'})
    }
    if(!this.forgetPasswordForm.valid)
      return swal("Algo deu errado!", 'Verifique os campos marcados com erro', 'error');
    this.usuarioService.forgetPassword(this.forgetPasswordForm.controls['email'].value)
      .then(p => {
        swal("Operação realizada com sucesso!", 'A sua senha é ' + p, 'success');
        this.modalEsqueciMinhaSenha.close();
      })
      .catch(r => {
        r.errors.forEach(e => this.forgetPasswordForm.controls[e.field].setErrors({message: e.message}));
        swal("Algo deu errado!", r.genericError ? r.genericError : 'Verifique os campos marcados com erro', 'error');
      })
  }

  resetSignupForm() {
    this.signupForm.clearValidators();
    this.signupForm.clearAsyncValidators();
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
    this.signupForm.reset({usuario: '', email: '', telefone: '', senha: '', repetirSenha: ''}, {emitEvent: true});
  }

  signUp(){
    this.usuarioService.signup(this.signupForm.value)
      .then(u => {
        this.resetSignupForm();
        this.tabContainer.setTabActive(0);
        // @ts-ignore
        this.signinForm.controls.usuario.setValue(u.usuario);
        swal('Operação realizada com sucesso!', 'O seu usuário foi cadastrado com sucesso', 'success');
      })
      .catch(r => {
        r.errors.forEach(e => this.signupForm.controls[e.field].setErrors({message: e.message}));
        swal("Algo deu errado!", r.genericError ? r.genericError : 'Verifique os campos marcados com erro', 'error');
      })
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

  checkTelefone(control) : ValidationErrors | null {
    return control.value.length < 14 ? {message: 'Por favor preencha um telefone válido'} : null;
  }

  openModalEsqueciMinhaSenha() : void {
    this.modalEsqueciMinhaSenha.open();
  }
}
