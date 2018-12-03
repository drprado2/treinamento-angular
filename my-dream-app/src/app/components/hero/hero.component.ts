import { Component, OnInit } from '@angular/core';
import {Hero} from '../../dtos/Hero';
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  selectedHero: Hero = {
    nome: null,
    id: null,
    phone: null
  };

  heroes: Hero[];

  constructor(private heroService : HeroService) { }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }

  onListClick(hero) {
    this.selectedHero =  {...hero};
  }

}
