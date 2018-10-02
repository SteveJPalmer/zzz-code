import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  // heroes: Hero[] = HEROES;   // simple - directly pull in data
  heroes: Hero[];               // adv - retrieve via service.getHeroes

  // selectedHero: Hero;    //only used when details was on same page

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // basic
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // observable
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>
        {this.heroes = heroes}
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);  // add to array (instead of getting Heroes again)
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }

}
