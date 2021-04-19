import axios from 'axios';
import debounce from 'lodash.debounce';
import { $, $$ } from './bling';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const rowHeight = 10;

const rowGap = window.innerWidth < 1000 ? 14 : 18;

function getStyleValue(element, style) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(style));
}

function getFilterParam() {
  const cegFilterArray = Array.from($$('.cegl__filter-tab'));
  const activeFilters = cegFilterArray
    .filter(filter => filter.classList.contains('cegfilter__active'))
    .map(each => each.dataset.num)
    .join('-');
  return activeFilters.length === 0 ? 'all' : activeFilters;
}

export function resizeCegLoad(parents) {
  const grid = document.querySelector('.cegrid');
  grid.style.gridAutoRows = 'auto';
  grid.style.alignItems = 'self-start';
  parents.forEach(item => {
    item.classList.remove('cegi__notyetloaded');
    item.style.gridRowEnd = `span ${Math.ceil(
      (item.clientHeight + rowGap) / (rowHeight + rowGap)
    )}`;
  });
  grid.removeAttribute('style');
}

export function resizeCegAll() {
  const grid = document.querySelector('.cegrid');
  grid.style.gridAutoRows = 'auto';
  grid.style.alignItems = 'self-start';
  Array.from($$('.cegi')).forEach(item => {
    item.style.gridRowEnd = `span ${Math.ceil(
      (item.clientHeight + rowGap) / (rowHeight + rowGap)
    )}`;
  });
  grid.removeAttribute('style');
}

export async function cegLoad(filter) {
  const filterParam = getFilterParam();
  try {
    const { data } = await axios.get(
      `/api/lazyceg/${window.cegpage}/${filterParam}`
    );
    if (filter) {
      $('.cegrid').innerHTML = data;
    } else {
      await $('.cegrid').insertAdjacentHTML('beforeend', data);
    }
    if (!data.length) return;
    const imgloaded = Array.from($$(`[data-fnum='${window.cegpage}']`));
    const parentsloaded = imgloaded.map(img => img.parentElement);
    Promise.all(
      imgloaded
        .filter(img => !img.complete)
        .map(
          img =>
            new Promise(resolve => {
              img.onload = img.onerror = resolve;
            })
        )
    ).then(() => {
      resizeCegLoad(parentsloaded);
      imgloaded.forEach(img => {
        img.src = img.dataset.src;
      });
    });
    if (data.length) window.cegpage += 1;
  } catch (e) {
    console.log(e);
  }
}

export function cegFilter() {
  const cegfilterArray = Array.from($$('.cegl__filter-tab'));
  cegfilterArray.forEach(filterItem => {
    filterItem.on('click', async e => {
      const { num } = e.currentTarget.dataset;
      e.currentTarget.parentElement.classList.toggle(
        `cegfilters__active${num}`
      );
      e.currentTarget.classList.toggle(`cegfilter__active`);
      window.cegpage = 1;
      cegLoad(true);
    });
  });
}

export function cegLoadScroll() {
  window.on(
    'scroll',
    debounce(async () => {
      if (
        Math.round(window.innerHeight + window.scrollY + 500) >=
        document.body.offsetHeight
      ) {
        cegLoad(false);
      }
    }, 100)
  );
}

// export function cegLoadScroll() {
//   const filterParam = getFilterParam();
//   window.on(
//     'scroll',
//     debounce(async () => {
//       // if (window.cegbusy) {
//       //   return;
//       // }
//       if (
//         Math.round(window.innerHeight + window.scrollY + 350) >=
//         document.body.offsetHeight
//       ) {
//         // window.cegbusy = true;
//         try {
//           const { data } = await axios.get(
//             `/api/lazyceg/${window.cegpage}/${filterParam}`
//           );
//           $('.cegrid').insertAdjacentHTML('beforeend', data);
//           Promise.all(
//             Array.from($$('.ceg__img'))
//               .filter(img => !img.complete)
//               .map(
//                 img =>
//                   new Promise(resolve => {
//                     img.onload = img.onerror = resolve;
//                   })
//               )
//           ).then(() => {
//             // resizeCEG();
//             $$('.ceg__img').forEach(img => {
//               img.src = img.dataset.src;
//             });
//           });
//           if (data.length) {
//             window.cegpage += 1;
//           } else {
//             return;
//           }
//           // window.cegbusy = false;
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     }, 100)
//   );
// }
