import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

export const tableSize = trigger('tableSize', [
  state(
    'eighty',
    style({
      width: '62%',
      'margin-right': '2%',
      float: 'left',
    })
  ),
  state(
    'sixty',
    style({
      width: '42%',
      'margin-right': '2%',
      float: 'left',
    })
  ),
  state(
    'largeForm',
    style({
      width: '23%',
      'margin-right': '2%',
      float: 'left',
    })
  ),
  state(
    'full',
    style({
      width: '0%',
      'margin-right': '0%',
      opacity: '0',
      float: 'left',
      display: 'none',
    })
  ),
  state(
    'hundred',
    style({
      width: '100%',
      float: 'left',
    })
  ),
  transition('eighty <=> hundred', animate('300ms ease-in')),
  transition('sixty <=> hundred', animate('300ms ease-in')),
  transition('largeForm <=> hundred', animate('300ms ease-in')),
  transition('full => hundred', [
    style({ display: 'block' }),
    animate('300ms ease-in'),
  ]),
  transition('hundred => full', animate('300ms ease-in')),
]);

export const formSize = trigger('formSize', [
  state(
    'twenty',
    style({
      width: '36%',
      float: 'left',
      transform: 'scale(1, 1)',
    })
  ),
  state(
    'sixty',
    style({
      width: '56%',
      float: 'left',
      transform: 'scale(1, 1)',
    })
  ),
  state(
    'largeForm',
    style({
      width: '75%',
      float: 'left',
      transform: 'scale(1, 1)',
    })
  ),
  state(
    'full',
    style({
      width: '100%',
      float: 'left',
      transform: 'scale(1, 1)',
    })
  ),
  state(
    'zero',
    style({
      width: '0px',
      float: 'left',
      display: 'none',
      transform: 'scale(0, 0)',
    })
  ),
  transition(
    'twenty => zero',
    group([
      animate('300ms ease-in', style({ opacity: 0 })),
      animate('300ms ease-in', style({ width: '0px' })),
      animate('300ms ease-in', style({ transform: 'scale(0, 0)' })),
    ])
  ),
  transition(
    'zero => twenty',
    group([
      animate('300ms ease-in', style({ opacity: 1 })),
      animate('300ms ease-in', style({ width: '36%' })),
      animate('300ms ease-in', style({ transform: 'scale(1, 1)' })),
    ])
  ),
  transition(
    'sixty => zero',
    group([
      animate('300ms ease-in', style({ opacity: 0 })),
      animate('300ms ease-in', style({ width: '0px' })),
      animate('300ms ease-in', style({ transform: 'scale(0, 0)' })),
    ])
  ),
  transition(
    'zero => sixty',
    group([
      animate('300ms ease-in', style({ opacity: 1 })),
      animate('300ms ease-in', style({ width: '56%' })),
      animate('300ms ease-in', style({ transform: 'scale(1, 1)' })),
    ])
  ),
  transition(
    'largeForm => zero',
    group([
      animate('300ms ease-in', style({ opacity: 0 })),
      animate('300ms ease-in', style({ width: '0px' })),
      animate('300ms ease-in', style({ transform: 'scale(0, 0)' })),
    ])
  ),
  transition(
    'zero => largeForm',
    group([
      animate('300ms', style({ opacity: 1 })),
      animate('300ms', style({ width: '75%' })),
      animate('300ms', style({ transform: 'scale(1, 1)' })),
    ])
  ),
  transition(
    'full => zero',
    group([
      animate('300ms', style({ opacity: 0 })),
      animate('300ms', style({ width: '0px' })),
      animate('300ms', style({ transform: 'scale(0, 0)' })),
    ])
  ),
  transition(
    'zero => full',
    group([
      animate('300ms', style({ opacity: 1 })),
      animate('300ms', style({ width: '100%' })),
      animate('300ms', style({ transform: 'scale(1, 1)' })),
    ])
  ),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-out', style({ opacity: 1 })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.5s ease-out', style({ opacity: 0 })),
  ]),
]);

export const routeAnimation = trigger('routeAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(100%)' }),
    animate(
      '0.4s ease-out',
      style({ opacity: 1, width: '100%', transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [animate('0.5s ease-out', style({ opacity: 0 }))]),
]);

export const leftRight = trigger('leftRight', [
  transition(':enter', [
    style({ opacity: 1, transform: 'translateX(-100%)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [animate('0.4s ease-out', style({ opacity: 0 }))]),
]);
