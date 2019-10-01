import { $, $$ } from './bling';

export function copyGif() {
  $$('.gif__item').on('click', e => {
    console.log(e.currentTarget);
    /* Get the text field */
    var copyText = document.getElementById('myInput');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
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
