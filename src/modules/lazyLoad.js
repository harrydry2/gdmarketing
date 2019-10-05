import axios from 'axios';
import { $, $$ } from './bling';
import { postPopup } from './postPopup';
import { resize, copyGif } from './gifs';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export function lazyLoad(filterArray) {
  window.onscroll = async () => {
    if (window.busy) {
      return;
    }
    if (
      Math.round(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      window.busy = true;
      // get active filters
      const activeFilters = filterArray
        .filter(filter => filter.classList.contains('filters__active'))
        .map(filter => filter.dataset.term)
        .join('-');
      // set filter param
      const filterParam = activeFilters.length === 0 ? 'all' : activeFilters;
      try {
        const { data } = await axios.get(
          `/api/lazy/${window.page}/${filterParam}`
        );
        $('.outerCard').insertAdjacentHTML('beforeend', data);
        postPopup(Array.from($$('.card')));
        if (data.length) {
          window.page += 1;
        } else {
          return;
        }
        window.busy = false;
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export function gifLoad() {
  window.onscroll = async () => {
    if (window.gifbusy) {
      return;
    }
    if (
      Math.round(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      window.gifbusy = true;
      try {
        const { data } = await axios.get(`/api/lazyGif/${window.page}`);
        $('.gif__inner-gif').insertAdjacentHTML('beforeend', data);
        copyGif();
        $$('.gif__video').forEach(video => {
          video.addEventListener('loadeddata', resize);
        });
        if (data.length) {
          window.page += 1;
        } else {
          return;
        }
        window.gifbusy = false;
      } catch (err) {
        console.log(err);
      }
    }
  };
}
