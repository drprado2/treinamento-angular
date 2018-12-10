import { Injectable } from '@angular/core';
import {LoaderObserver} from "../interfaces/LoaderObserver";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private itensLoading: any[] = [];
  private observers: LoaderObserver[] = [];

  constructor() { }

  public addObserver(observer: LoaderObserver){
    this.observers.push(observer);
  }

  public addLoading(){
    this.itensLoading.push(null);
    this.loaderUpdated();
  }

  public removeLoading(){
    this.itensLoading.pop();
    this.loaderUpdated();
  }

  private loaderUpdated(){
    if(this.itensLoading.length === 0)
      this.observers.forEach(o => o.update(false));
    if(this.itensLoading.length === 1)
      this.observers.forEach(o => o.update(true));
  }
}
