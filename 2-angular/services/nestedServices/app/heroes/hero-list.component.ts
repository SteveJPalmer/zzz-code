import { Component }   from '@angular/core';

//hero service
import { Hero }        from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'hero-list',
  providers: [HeroService],
  template: `
  <div *ngFor="let hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  `
})
export class HeroListComponent {
  heroes: Hero[];                           //heroes var of type Hero

  constructor(heroService: HeroService) {   //inject instance of HeroService to fetch data
    //call the injected service
    this.heroes = heroService.getHeroes();
  }
}

