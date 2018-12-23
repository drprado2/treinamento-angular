import { Injectable } from '@angular/core';
import {Usuario} from "../dtos/Usuario";
import {guid} from "../utils/funcions";
import {RequestError} from "../dtos/RequestError";
import {LoaderService} from "./loader.service";
import {Router} from "@angular/router";

const defaultUsers : Usuario[] = [
  {id: guid(), email: 'adriano@gmail.com', senha: '123A', telefone: '4499994236', usuario: 'adriano'},
  {id: guid(), email: 'maria@gmail.com', senha: '123A', telefone: '4499994237', usuario: 'maria'},
  {id: guid(), email: 'renata@gmail.com', senha: '123A', telefone: '4499994238', usuario: 'renata'},
]

function createPromise<T>(data: T, timeout: number = 4000, forceError: boolean = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => forceError ? reject(data) : resolve(data), timeout);
  });
}

function createInitialData() {
  const currentData = localStorage.getItem('users');
  if(!currentData){
    const stringData = JSON.stringify(defaultUsers);
    localStorage.setItem('users', stringData);
  }
}

function getCurrentUsers() : Usuario[] {
  return JSON.parse(localStorage.getItem('users'));
}

function save(users: Usuario[]){
  localStorage.setItem('users', JSON.stringify(users));
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private users : Usuario[];

  constructor(private loaderService: LoaderService, private router: Router) {
    createInitialData();
    this.users = getCurrentUsers();
  }

  get() : Promise<Usuario[] | RequestError> {
    this.loaderService.addLoading();
    return createPromise(this.users)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
      .catch(e => {
        this.loaderService.removeLoading();
        return Promise.reject(e);
      });
  }

  getById(id: string) : Promise<Usuario | null | RequestError> {
    this.loaderService.addLoading();
    return createPromise(this.users.find(u => u.id === id))
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
      .catch(e => {
          this.loaderService.removeLoading();
          return Promise.reject(e);
        });
  }

  isEmailAvailable(email: string) : Promise<boolean | RequestError> {
    return createPromise(!this.users.find(u => u.email === email))
      .then(d => d)
      .catch(e => Promise.reject(e));
  }

  add(usuario: Usuario) : Promise<Usuario | RequestError> {
    this.loaderService.addLoading();

    let clone = {...usuario};
    clone.id = guid();
    this.users.push(clone);
    save(this.users);

    return createPromise(clone)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
      .catch(e => {
        this.loaderService.removeLoading();
        return Promise.reject(e);
      });
  }

  update(id: string, usuario: Usuario) : Promise<Usuario | RequestError> {
    this.loaderService.addLoading();

    let result : Usuario | RequestError;
    let user = this.users.find(u => u.id === id);
    if(!user)
      result = {errorCode: 400, genericError: 'Usuário não existe', errors: []};

    user.email = usuario.email;
    user.usuario = usuario.usuario;
    user.telefone = usuario.telefone;
    user.senha = usuario.senha;
    save(this.users);

    result = {...user};

    return createPromise(result)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
      .catch(e => {
        this.loaderService.removeLoading();
        return Promise.reject(e);
      });
  }

  remove(id: string) : Promise<null | RequestError> {
    this.loaderService.addLoading();

    let result : null | RequestError = null;

    let userIndex = this.users.findIndex(u => u.id === id);
    if(userIndex < 0)
      result = {errorCode: 400, genericError: 'Usuário não existe', errors: []};
    else
        this.users = this.users.slice(0, userIndex).concat(this.users.slice(userIndex + 1));
    save(this.users);

    return createPromise(result)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
      .catch(e => {
        this.loaderService.removeLoading();
        return Promise.reject(e);
      });
  }

  createJwtStorage(token: any) : void {
    localStorage.setItem('jwt', token);
  }

  signin(username: string, password: string) : Promise<void | RequestError> {
    this.loaderService.addLoading();

    let result: string | RequestError = "token-jwt";
    let error = false;
    const user = this.users.find(u => u.usuario === username);
    if(!user){
      result = {errorCode: 400, genericError: null, errors: [{field: 'usuario', message: 'Usuário não cadastrado'}]};
      error = true;
    }
    else {
      if(user.senha !== password){
        result = {errorCode: 400, genericError: null, errors: [{field: 'senha', message: 'Senha incorreta'}]};
        error = true;
      }
    }

    return createPromise(result, 4000, error)
      .then(d => {
        this.loaderService.removeLoading();
        this.createJwtStorage(d);
        this.router.navigate(['/dashboard']);
      })
      .catch(e => {
        this.loaderService.removeLoading();
        return Promise.reject(e);
      });
  }

  forgetPassword(email: string) : Promise<String | RequestError> {
    this.loaderService.addLoading();
    const user = this.users.find(u => u.email === email);

    if(!user)
      return createPromise({errorCode: 400, genericError: null, errors: [{field: 'email', message: 'E-mail não cadastrado'}]}, 2000, true)
        .catch(u => {
          this.loaderService.removeLoading();
          return Promise.reject(u);
        });

    return createPromise(user.senha, 4000)
      .then(u => {
        this.loaderService.removeLoading();
        return u;
      })
  }

  signup(user: Usuario) : Promise<Usuario | RequestError> {
    this.loaderService.addLoading();

    let error = {errors: [], errorCode: 400, genericError: null};
    this.users.forEach(u => {
      if(u.telefone === user.telefone)
        error = {...error, errors: error.errors.concat([{field: 'telefone', message: 'Telefone já está em uso'}])}
      if(u.usuario === user.usuario)
        error = {...error, errors: error.errors.concat([{field: 'usuario', message: 'Usuário já está em uso'}])}
    });

    if(error.errors.length > 0)
        return createPromise(error, 4000, true)
          .catch(e => {
            this.loaderService.removeLoading();
            return Promise.reject(e);
          });

    user.id = guid();
    this.users.push(user);
    save(this.users);

    return createPromise({...user}, 4000)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
  }
}
