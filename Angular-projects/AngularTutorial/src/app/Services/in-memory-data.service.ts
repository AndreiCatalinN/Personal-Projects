import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';
import { Injectable } from '@angular/core';
import {powers} from '../powers';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 0, name: 'Fluture', alterEgo: 'Alina', power: powers[0] },
      { id: 1, name: 'Alina', alterEgo: 'Alina', power: powers[1] },
      { id: 2, name: 'Mr. Nice', alterEgo: 'Tony Stark', power: powers[2] },
      { id: 3, name: 'Narco', alterEgo: 'Stephen Strange', power: powers[3] },
      { id: 4, name: 'Bombasto', alterEgo: 'Peter Parker', power: powers[4] },
      { id: 5, name: 'Celeritas', alterEgo: 'Bruce Banner', power: powers[5] },
      { id: 6, name: 'Magneta', alterEgo: 'Bruce Wayne', power: powers[6] },
      { id: 7, name: 'RubberMan', alterEgo: 'Matt Murdock', power: powers[1] },
      { id: 8, name: 'Dynama', alterEgo: 'Ryan Reynolds', power: powers[2] },
      { id: 9, name: 'Dr IQ', alterEgo: 'Clark Kent', power: powers[3] },
      { id: 10, name: 'Magma', alterEgo: 'Reed Richards', power: powers[4] },
      { id: 11, name: 'Tornado', alterEgo: 'Arthur Curry', power: powers[7] },
      { id: 12, name: 'Windstorm', alterEgo: 'Diana Prince', power: powers[7] }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (20).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 20;
  }
}
