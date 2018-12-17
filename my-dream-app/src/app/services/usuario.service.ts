import { Injectable } from '@angular/core';
import {Usuario} from "../dtos/Usuario";
import {guid} from "../utils/funcions";
import {RequestError} from "../dtos/RequestError";
import {LoaderService} from "./loader.service";
import {Router} from "@angular/router";

const defaultUsers : Usuario[] = [
  {id: guid(), email: 'adriano@gmail.com', password: '123A', telefone: '4499994236', user: 'adriano'},
  {id: guid(), email: 'maria@gmail.com', password: '123A', telefone: '4499994237', user: 'maria'},
  {id: guid(), email: 'renata@gmail.com', password: '123A', telefone: '4499994238', user: 'renata'},
]

function createPromise<T>(data: T, timeout: number = 4000, forceError: boolean = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => forceError ? reject(data) : resolve(data), timeout);
  });
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private users : Usuario[] = defaultUsers;

  constructor(private loaderService: LoaderService, private router: Router) { }

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
    user.user = usuario.user;
    user.telefone = usuario.telefone;
    user.password = usuario.password;

    result = user;

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
    const user = this.users.find(u => u.user === username);
    if(!user){
      result = {errorCode: 400, genericError: null, errors: [{field: 'usuario', message: 'Usuário não cadastrado'}]};
      error = true;
    }
    else {
      if(user.password !== password){
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

  signup(user: Usuario) : Promise<Usuario | RequestError> {
    this.loaderService.addLoading();

    let error = {errors: [], errorCode: 400, genericError: null};
    this.users.forEach(u => {
      if(u.telefone === user.telefone)
        error = {...error, errors: error.errors.concat([{field: 'telefone', message: 'Telefone já está em uso'}])}
      if(u.user === user.user)
        error = {...error, errors: error.errors.concat([{field: 'user', message: 'Usuário já está em uso'}])}
    });

    if(error.errors.length > 0)
        return createPromise(error, 4000, true)
          .catch(e => {
            this.loaderService.removeLoading();
            return Promise.reject(e);
          });

    user.id = guid();
    this.users.push(user);

    return createPromise({...user}, 4000)
      .then(d => {
        this.loaderService.removeLoading();
        return d;
      })
  }
}
