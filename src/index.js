import './sass/styles.sass';
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { $, $$ } from './modules/bling';

const filterArray = Array.from($$('.filters__spec'));

filterArray.forEach(filterItem => {
  filterItem.on('click', async e => {
    // toggle active state
    e.currentTarget.classList.toggle('filters__active');
    // array of active filters
    const activeFilters = filterArray
      .filter(filter => filter.classList.contains('filters__active'))
      .map(filter => filter.dataset.term)
      .join('-');
    // change push state
    window.history.pushState(
      'data to be passed',
      'Title of the page',
      `${activeFilters}-marketing-examples`
    );
    // axios the new marketing ideas
    const { data } = await axios.get(`/api/getideas?q=${activeFilters}`);
    $('.outerCard').innerHTML = data;
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
});

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
