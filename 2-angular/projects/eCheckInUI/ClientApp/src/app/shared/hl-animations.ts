import {animate, state, style, transition, trigger} from "@angular/animations";

/* detail view animation */
export const hlDetail = trigger('hlDetail', [
  state('true', style(
    {transform: 'translateX(0)'})
  ),
  transition('void => *', [
    style({transform: 'translateX(100%)'}),
    animate('0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
  ])
]);

/* list view animation */
export const hlList = trigger('hlList', [
  state('true', style(
    {opacity: '1'})
  ),
  transition('void => *', [
    style({opacity: '0'}),
    animate(500)
  ])
]);

/* data refresh animation */
export const hlData = trigger('hlData', [
  state('true', style(
    {opacity: '1'})
  ),
  transition('void => *', [
    style({opacity: '0'}),
    animate(800)
  ])
]);



