import { Component, OnInit, HostBinding } from '@angular/core';

/* add aminations */
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  animations: [slideInDownAnimation]
})
export class OrderListComponent implements OnInit {

  constructor() { }

  /* add 3 @HostBinding prop to class - sets animation for  route comp host elem */
  @HostBinding('@routeAnimation') routeAnimation = true;			// sets o true because as only care about :enter & :leave states
  @HostBinding('style.display')   display = 'block';					// sets host elem style.display to the comp prop display
  @HostBinding('style.position')  position = 'absolute';

  ngOnInit() {
  }

}
