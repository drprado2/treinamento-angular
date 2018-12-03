import { Component, OnInit } from '@angular/core';
import {Hero} from '../../dtos/Hero';
import swal from 'sweetalert2';
import Chameleon from '../../../../chameleon/Chameleon';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  hero: Hero = {
    nome: null,
    id: null,
    phone: null
  };
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

  ngOnInit() {
    Chameleon.init('#phone', '(99) 9999-9999', '(99) 99999-9999');
  }

  onListClick(hero) {
    this.hero =  {...hero};
  }

  saveHero() {
    if (!this.hero.nome) {
      return;
    }

    const existentHeroIndex = this.heroes.findIndex(h => h.id === this.hero.id);
    console.log('vindo salvar', this.hero.id, existentHeroIndex)
    if (existentHeroIndex > -1) {
      this.heroes[existentHeroIndex] = this.hero;
    } else {
      let maiorId = 0;
      this.heroes.forEach(h => {
        maiorId = maiorId < h.id ? h.id : maiorId;
      });
      this.hero.id = maiorId + 1;
      this.heroes.push(this.hero);
    }
    this.hero = {id: null, nome: null, phone: null};
    swal(
      'Sucesso!',
      'Seu heroi foi salvo!',
      'success'
    );
  }

  deleteHero() {
    if (!this.hero.id) {
      return;
    }

     swal({
      title: 'Deseja realmente deletar??',
      text: 'Caso você confirme não será possível reverter essa ação!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar!'

    }).then((result) => {
       if (result.value) {
         const heroIndex = this.heroes.findIndex(h => h.id === this.hero.id);
         this.heroes = this.heroes.slice(0, heroIndex).concat(this.heroes.slice(heroIndex + 1, this.heroes.length));
         this.hero = {id: null, nome: null, phone: null};
         swal(
           'Deletado!',
           'Seu heroi foi deletado.',
           'success'
         );
       }
     });
  }
}
