import axios from 'axios';
import { $, $$ } from './bling';

function closePopup() {
  // remove outer post
  $('.outerPost').style.display = 'none';
  // remove no scroll and post no scroll
  $('body').classList.remove('noScroll');
  $('body').classList.remove('postNoScroll');
  // push back to "/"
  window.history.pushState('', '', '/');
}

export function postPopup(cards) {
  cards.forEach(card => {
    card.on('click', async e => {
      if (e.target.classList.contains('pCard__bottom-link-text')) {
        return;
      }
      // add noScroll
      $('body').classList.add('noScroll');
      // show outer post
      $('.outerPost').style.display = 'flex';
      // populate post
      const { slug } = e.currentTarget.dataset;
      $('.popupLoader').style.display = 'flex';
      const [cardDataObject, contentDataObject] = await Promise.all([
        axios.get(`/api/getpCard?slug=${slug}`),
        axios.get(`/api/getcontent?slug=${slug}`),
      ]);
      const { data: cardData } = cardDataObject;
      const { data: contentData } = contentDataObject;
      $('.post__top').innerHTML = cardData;
      $('.content').innerHTML = contentData;
      $('.popupLoader').style.display = 'none';
      // push
      window.history.pushState('', '', `../${slug}`);
    });
  });

  // close on click
  $('.outerPost__close').on('click', () => {
    closePopup();
  });

  // close on esc
  document.on('keydown', e => {
    if (e.keyCode === 27) {
      closePopup();
    }
  });
}
