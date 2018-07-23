import { Component } from '@angular/core';
import { Joke } from './joke/joke';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //create a new Joke instance
  joke: Joke = new Joke(
    "What did 0 say to 8?",
    "Hey, nice belt!"
  );

}
