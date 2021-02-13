import { $, $$ } from './bling';

export function cycleImages() {
  console.log('bingo');
  const active = $('.ccc__right-imgActive');
  const next = active.nextElementSibling
    ? active.nextElementSibling
    : $('.ccc__right img:first-of-type');
  active.classList.remove('ccc__right-imgActive');
  next.classList.add('ccc__right-imgActive');
}
