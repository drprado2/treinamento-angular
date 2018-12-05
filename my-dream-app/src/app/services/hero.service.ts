import { Injectable } from '@angular/core';
import {Hero} from "../dtos/Hero";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  teste: string = '';

  heroes: Hero[] = [
    {id: 1, nome: 'Super Homem', phone: '(51) 99984-8236'},
    {id: 2, nome: 'Homem Aranha', phone: '(44) 99993-4236'},
    {id: 3, nome: 'Super Mulher', phone: '(44) 9988-4236'},
    {id: 4, nome: 'Homem de Ferro', phone: '(44) 9879-4236'},
    {id: 5, nome: 'Batman', phone: '(44) 99994-4236'},
    {id: 6, nome: 'Hulk', phone: '(44) 99887-4236'},
    {id: 7, nome: 'Doutor Estranho', phone: '(44) 99887-4236'},
  ];

  constructor() { }

  getHeroes() {
    return this.heroes;
  }

  async getGit() : Promise<any> {
    let result = await fetch('https://api.github.com/search/users?q=drprado2');
    return result.json();
  }
}
