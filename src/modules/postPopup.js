import axios from 'axios';
import { $, $$ } from './bling';

export function postPopup(cards) {
  cards.forEach(card => {
    card.on('click', async e => {
      $('.outerPost').style.display = 'flex';
      const { slug } = e.currentTarget.dataset;
      window.history.pushState('', '', `../${slug}`);
      const { data } = await axios.get(`/api/getpCard?slug=${slug}`);
      const { data: content } = await axios.get(`/api/getcontent?slug=${slug}`);
      $('.post__top').innerHTML = data;
      $('.content').innerHTML = content;
    });
  });

  // close back to home
  $('.outerPost__close').on('click', () => {
    $('.outerPost').style.display = 'none';
    $('body').classList.toggle('noScroll');
    window.history.pushState('', '', '/');
    // window.history.back();
  });
}
