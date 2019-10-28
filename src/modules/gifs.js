import ClipboardJS from 'clipboard';
import { $, $$ } from './bling';

export function copyGif() {
  const clip = $$('.gif__item');
  const clipboard = new ClipboardJS(clip);
  clipboard.on('success', e => {
    const text = e.trigger.querySelector('.gif__item-overlay-text');
    text.innerText = 'Gif copied :)';
  });
}

function getStyleValue(element, style) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(style));
}

export function resize() {
  const grid = document.querySelector('.gif__inner-gif');
  const rowHeight = getStyleValue(grid, 'grid-auto-rows');
  const rowGap = getStyleValue(grid, 'grid-row-gap');
  grid.style.gridAutoRows = 'auto';
  grid.style.alignItems = 'self-start';
  grid.querySelectorAll('.gif__item').forEach(item => {
    item.style.gridRowEnd = `span ${Math.ceil(
      (item.clientHeight + rowGap) / (rowHeight + rowGap)
    )}`;
  });
  grid.removeAttribute('style');
}

// function iiViewport(elem) {
//   const bounding = elem.getBoundingClientRect();
//   return (
//     bounding.top >= 0 &&
//     bounding.left >= 0 &&
//     bounding.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     bounding.right <=
//       (window.innerWidth || document.documentElement.clientWidth)
//   );
// }

// export function gifStart() {
//   const gifs = $$('.gif__video');
//   window.addEventListener('scroll', () => {
//     gifs.forEach(gif => {
//       if (iiViewport(gif)) {
//         if (gif.paused) {
//           gif.play();
//         }
//       } else if (!gif.paused) {
//         gif.pause();
//       }
//     });
//   });
// }
