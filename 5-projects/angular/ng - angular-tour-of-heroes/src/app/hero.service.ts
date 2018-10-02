import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/operator/map';   //uses .pipe() - diff technique to tissuetyping
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';    // basic mock data (can replace with ng in-memory-web-api)

import { MessageService } from './message.service';


// add special header in HTTP save requests
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  // basic
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

/*
  // simple observable
  getHeroes(): Observable<Hero[]> {
    // additionally send a message _after_ fetching heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
*/

  /** swap for a RESTful api - GET heroes from server (or in-memory-web-api) */
  private heroesUrl = 'http://localhost:8261/api/heroes';  // URL to web api


  getHeroes (): Observable<Hero[]> {          // typed to array of Hero objs
    this.log('HeroService: fetched heroes');
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        // operator to tap into observable flow & do something (but like do) - doesn't touch values
        tap(heroes => this.log(`fetched heroes`)),  // additionally send a message _after_ fetching heroes
        map((res) => {
          console.log('>>HeroService - res: ' + JSON.stringify(res, null, 2));
          return res;
        }),
        // catchError() operator intercepts an Observable that failed & passes error an app error handler method
        catchError(this.handleError('getHeroes', []))
      );
  }


/*
  getHero(id: number): Observable<Hero> {
    // additionally send a message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    this.log(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
*/

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {           // typed to single Hero obj
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),   // additionally send a message _after_ fetching the hero
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  /** POST: add a new hero to  server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, httpOptions)   // server generates id for new hero & returns it in Observable
      .pipe(
        tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** PUT: update the hero on server */
  updateHero (hero: Hero): Observable<any> {
    // HttpClient.put() method takes 3 params (URL, the modified data to update, options obj)
    return this.http
      .put(this.heroesUrl, hero, httpOptions)   // options defined outside of class
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero')
      )
    );
  }


  /* Search - GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Hero[]>(`api/heroes/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  /** DELETE: delete the hero from  server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  /** pull additionally send message into local method fro reuse */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // Note: Instead of handling the error directly, it returns an error handler function to catchError,
  // that it has configured with both the name of the operation that failed and a safe return value.
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('>>HeroService app error:');
      console.error(error);  // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
