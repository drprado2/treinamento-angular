import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
import Chameleon from '../../../../chameleon/Chameleon';
import {Hero} from '../../dtos/Hero';
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  @Input() heroes: Hero[];

  constructor(private heroService : HeroService) { }

  ngOnInit() {
    Chameleon.init('#phone', '(99) 9999-9999', '(99) 99999-9999');
  }

  saveHero() {
    if (!this.hero.nome) {
      return;
    }

    const existentHeroIndex = this.heroes.findIndex(h => h.id === this.hero.id);
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
