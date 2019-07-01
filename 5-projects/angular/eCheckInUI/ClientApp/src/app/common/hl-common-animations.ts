import { animate, state, style, transition, trigger } from '@angular/animations';

/* extend pagination animation */
export const hlFadeIn = trigger('hlFadeIn', [
  state('true', style(
    {opacity: '1'})
  ),
  transition('void => *', [
    style({opacity: '0'}),
    animate(1500)
  ])
]);



