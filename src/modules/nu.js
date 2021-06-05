import axios from 'axios';
import debounce from 'lodash.debounce';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { $, $$ } from './bling';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const rowHeight = 10;

const rowGap = window.innerWidth < 1000 ? 14 : 15;

function getStyleValue(element, style) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(style));
}

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body;
}

const msnry = new Masonry('.nugrid', {
  itemSelector: '.cegio',
  gutter: 15,
});

function getFilterParam() {
  // const cegFilterArray = Array.from($$(".cegl__filter-tab"));
  const cegFilterArray =
    window.innerWidth < 930
      ? Array.from($$('.cegm__bottom-tab'))
      : Array.from($$('.cegl__filter-tab'));
  const activeFilters = cegFilterArray
    .filter(filter => filter.classList.contains('cegfilter__active'))
    .map(each => each.dataset.num)
    .join('-');
  return activeFilters.length === 0 ? 'all' : activeFilters;
}

export function cegMobileFilter() {
  const minus = $('.cegm__top-right-minus');
  const plus = $('.cegm__top-right-plus');
  const cross = $('.cegm__bottom-cross');
  const bottomMenu = $('.cegm__bottom');
  const clickies = [plus, minus, cross];
  clickies.forEach(clicki => {
    clicki.on('click', e => {
      bottomMenu.classList.toggle('cegmtr__active');
      minus.classList.toggle('cegmtr__active');
      plus.classList.toggle('cegmtr__active');
    });
  });
}

export function cegimobtap(parents) {
  parents.forEach(parent => {
    parent.on('click', e => {
      parent.classList.toggle('cegimobtap');
    });
  });
}

export async function nuLoad(filter) {
  const filterParam = getFilterParam();
  try {
    const { data } = await axios.get(
      `/api/lazyceg/${window.cegpage}/${filterParam}`
    );
    const html = stringToHTML(data);
    if (filter) {
      console.log('beans');
      msnry.remove($$('.cegio'));
      $('.nugrid').append(html);
      msnry.appended(html);
      // $(".nugrid").append(html);
    } else {
      $('.nugrid').append(html);
      msnry.appended(html);
    }
    if (!data.length) return;
    const imgloaded = Array.from($$(`[data-fnum='${window.cegpage}']`));
    const parentsloaded = imgloaded.map(img => img.parentElement.parentElement);
    // await imagesLoaded(imgloaded);
    imagesLoaded(imgloaded, function() {
      // msnry.reloadItems();
      msnry.layout(parentsloaded);
      parentsloaded.forEach(parent => {
        // parent.classList.remove('cegi__notyetloaded');
        parent.firstElementChild.firstElementChild.firstElementChild.innerHTML =
          parent.firstElementChild.firstElementChild.dataset.html;
      });
      imgloaded.forEach(img => {
        img.src = img.dataset.src;
      });
      if (window.innerWidth < 930) {
        cegimobtap(parentsloaded);
      }
    });
    // Promise.all(
    //   imgloaded
    //     .filter(img => !img.complete)
    //     .map(
    //       img =>
    //         new Promise(resolve => {
    //           img.onload = img.onerror = resolve;
    //         })
    //     )
    // ).then(() => {
    //   // resizeCegLoad(parentsloaded);
    //   msnry.reloadItems();
    //   msnry.layout();
    // });
    if (data.length) {
      window.cegpage += 1;
    }
  } catch (e) {
    console.log(e);
  }
}

export function nuFilter() {
  // const cegfilterArray = Array.from($$('.cegl__filter-tab'));
  const cegFilterArray =
    window.innerWidth < 930
      ? Array.from($$('.cegm__bottom-tab'))
      : Array.from($$('.cegl__filter-tab'));
  cegFilterArray.forEach(filterItem => {
    filterItem.on('click', async e => {
      const { num } = e.currentTarget.dataset;
      e.currentTarget.parentElement.classList.toggle(
        `cegfilters__active${num}`
      );
      e.currentTarget.classList.toggle(`cegfilter__active`);
      window.cegpage = 1;
      nuLoad(true);
    });
  });
}

export function nuLoadScroll() {
  window.on(
    'scroll',
    debounce(async () => {
      if (
        Math.round(window.innerHeight + window.scrollY + 500) >=
        document.body.offsetHeight
      ) {
        nuLoad(false);
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
