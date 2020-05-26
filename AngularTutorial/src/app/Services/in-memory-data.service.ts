import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 0, name: 'Fluture' },
      { id: 1, name: 'Alina' },
      { id: 2, name: 'Mr. Nice' },
      { id: 3, name: 'Narco' },
      { id: 4, name: 'Bombasto' },
      { id: 5, name: 'Celeritas' },
      { id: 6, name: 'Magneta' },
      { id: 7, name: 'RubberMan' },
      { id: 8, name: 'Dynama' },
      { id: 9, name: 'Dr IQ' },
      { id: 10, name: 'Magma' },
      { id: 11, name: 'Tornado' },
      { id: 12, name: 'Windstorm' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math
        .max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
