import axios from 'axios';
import { $, $$ } from './bling';
import { postPopup } from './postPopup';

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
        $('.loader').style.display = 'block';
        const { data } = await axios.get(
          `/api/lazy/${window.page}/${filterParam}`
        );
        $('.outerCard').insertAdjacentHTML('beforeend', data);
        $('.loader').style.display = 'none';
        postPopup(Array.from($$('.card')));
        if (data.length) {
          window.page += 1;
        } else {
          $('.outerLoader').style.display = 'none';
          return;
        }
        window.busy = false;
      } catch (err) {
        console.log(err);
      }
    }
  };
}
