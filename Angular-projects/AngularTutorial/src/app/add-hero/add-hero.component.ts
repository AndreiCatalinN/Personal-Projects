import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {powers} from '../powers';
import {HeroService} from '../Services/hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  powers = powers;
  list: Hero[];
  model: Hero = { id: 18, name: '', alterEgo: '', power: this.powers[0]};

  constructor(
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void { }

  add(): void {
    this.model.name = this.model.name.trim();
    this.model.alterEgo = this.model.alterEgo.trim();

    this.heroService.addHero(this.model as Hero).subscribe(
      hero => this.list.push(hero)
    );
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
