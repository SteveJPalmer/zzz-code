import { animate, state, style, transition, trigger } from '@angular/animations';

export const hlAdminRoute = trigger('adminRoute', [
  state('show', style(
    {opacity: '1'})
  ),
  transition('void => *', [
    style({opacity: '0'}),
    animate('900ms cubic-bezier(0.445, 0.05, 0.55, 0.95)')
  ])
]);

export const hlAdminView = trigger('adminView', [
  state('show', style(
    {opacity: '1'})
  ),
  transition('void => *', [
    style({opacity: '0'}),
    animate('500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)')
  ])
]);
