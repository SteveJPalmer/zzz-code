import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

import { Hero } from '../hero';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  @Input() hero: Hero;

  getHero(): void {
    // extract the passed param :id
    const id = +this.route.snapshot.paramMap.get('id');     // (+) operator converts the string to a number
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  // navigates back to previous route (aka back button)
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getHero();
  }

}
