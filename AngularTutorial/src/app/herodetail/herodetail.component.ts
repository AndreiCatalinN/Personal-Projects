import { Input, Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../Services/hero.service';
import {powers} from '../powers';

@Component({
  selector: 'app-herodetail',
  templateUrl: './herodetail.component.html',
  styleUrls: ['./herodetail.component.scss']
})
export class HerodetailComponent implements OnInit {
  @Input() hero: Hero;

  powers = powers;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    // gets id from URL
    const id = +this.route.snapshot.paramMap.get('id');
    // gets hero based on id
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.heroService.deleteHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
