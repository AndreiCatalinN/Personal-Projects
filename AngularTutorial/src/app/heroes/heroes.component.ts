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
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe( list => this.list = list);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  delete(hero: Hero): void {
    this.list = this.list.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.list.push(hero);
      });
  }
}
