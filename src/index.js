import './sass/styles.sass';
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { $, $$ } from './modules/bling';
import { postPopup } from './modules/postPopup';
import { mailPopup } from './modules/mailPopup';
import { lazyLoad } from './modules/lazyLoad';

window.page = 2;
window.busy = false;

console.log($('.outerLoader'));

// 1) Deals with the filter across screens

let filterArray;
const array = Array.from($$('.filters__spec'));
const arrayLength = array.length;

if (window.innerWidth < 768) {
  filterArray = array.slice(arrayLength / 2, arrayLength);
} else {
  filterArray = array.slice(0, arrayLength / 2);
}

lazyLoad(filterArray);

filterArray.forEach(filterItem => {
  filterItem.on('click', async e => {
    // reset page settings for new filters
    window.page = 2;
    window.busy = false;
    $('.outerLoader').style.display = 'block';
    // toggle active state
    e.currentTarget.classList.toggle('filters__active');
    // array of active filters
    const activeFilters = filterArray
      .filter(filter => filter.classList.contains('filters__active'))
      .map(filter => filter.dataset.term)
      .join('-');
    // if no filters default to all
    if (activeFilters.length === 0) {
      window.history.pushState('', '', `/`);
      var { data } = await axios.get(`/api/lazy/1/all`);
    } else {
      // change push state
      window.history.pushState('', '', `/marketing-examples/${activeFilters}`);
      // axios the filtered marketing ideas
      var { data } = await axios.get(`/api/lazy/1/${activeFilters}`);
    }
    $('.outerCard').innerHTML = data;
    // popup after dynamically inserted
    postPopup(Array.from($$('.card')));
  });
});

const hmButton = $('.hm__button');
const hmFilters = $('.hm__filters');
hmButton.on('click', () => {
  const it1 = 'Show filters';
  const it2 = 'Show marketing ideas';
  if (hmButton.innerText === it1) {
    hmButton.innerText = it2;
  } else {
    hmButton.innerText = it1;
  }
  hmFilters.classList.toggle('hm__filters-active');
  $('.iosOverflow').classList.toggle('noScroll');
});

// mailPopup
mailPopup();

// popup from homepage (also if close post page)
postPopup(Array.from($$('.card')));

// const client = algoliasearch('5E0AQ9NLML', '7d9052aece14bf435bb151b3e44da2d9');
// const index = client.initIndex('cards');

// index.search(
//   {
//     query: 'Reddit',
//     // attributesToRetrieve: ['firstname', 'lastname'],
//     hitsPerPage: 50,
//   },
//   function searchDone(err, content) {
//     if (err) throw err;

//     console.log(content.hits);
//   }
// );
