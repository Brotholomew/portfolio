import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const moveBall = animation([
  style({
    left: '{{ height }}',
    top: '{{ opacity }}'
  }),
  animate('{{ speed }}ms')
]);
