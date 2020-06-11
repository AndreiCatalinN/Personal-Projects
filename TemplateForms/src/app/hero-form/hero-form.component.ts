import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Genius', 'Flexible Body', 'Fire Body', 'Weather Changer'];
  model = new Hero(18, 'Dr. Smart', this.powers[0], 'Choke Norris');
  submitted = false;

  onSubmit() { this.submitted = true; }

  newHero() {
    this.model = new Hero(42, '', '');
  }

  constructor() { }

  ngOnInit(): void {
  }


}
