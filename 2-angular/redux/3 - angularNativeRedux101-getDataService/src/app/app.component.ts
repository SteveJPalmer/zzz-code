import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{name}}</h1>
            <course-list></course-list>`,
})
export class AppComponent  { name = 'Angular with native Redux'; }
