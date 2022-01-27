import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Directives';

  /* aoHighlightAdvanced */
  color: string = '';

  /* *unless directive */
  condition = false;
}
