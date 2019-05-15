import axios from 'axios';
import { $, $$ } from './bling';
import { mailSubmitAddOn } from './mailPopup';

function closePopup() {
  // remove outer post
  $('.outerPost').style.display = 'none';
  // remove no scroll and post no scroll
  $('.iosOverflow').classList.remove('noScroll');
  $('.iosOverflow').classList.remove('postNoScroll');
  // push back to "/"
  window.history.pushState('', '', '/');
}

export function postPopup(cards) {
  cards.forEach(card => {
    card.on('click', async e => {
      if (e.target.classList.contains('pCard__bottom-link-text')) {
        return;
      }
      const tag = card
        .querySelector('.card__bottom-tag')
        .className.split(' ')[1]
        .substring(4);
      // add noScroll
      $('.iosOverflow').classList.add('noScroll');
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
      mailSubmitAddOn();
      // push
      window.history.pushState('', '', `../${tag}/${slug}`);
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
