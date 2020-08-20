import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../Services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  list: Hero[];

  constructor(
    private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(  heroes => this.list = heroes);
  }


  delete(hero: Hero): void {
    this.list = this.list.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
