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

function preloadImages(srcs) {
  function loadImage(src) {
    return new Promise(function(resolve, reject) {
      const img = new Image();
      img.onload = function() {
        resolve(img);
      };
      img.onerror = img.onabort = function() {
        reject(src);
      };
      img.src = src;
    });
  }
  const promises = [];
  for (let i = 0; i < srcs.length; i++) {
    promises.push(loadImage(srcs[i]));
  }
  return Promise.all(promises);
}

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body;
}

function createnext10mini(arr) {
  return arr.map(
    x => `https://ik.imagekit.io/o08ysq9vx/tr:w-.01,bl-100,q-06/cegy${x}.png`
  );
}

function createnext10(arr) {
  return arr.map(x => `https://ik.imagekit.io/o08ysq9vx/cegy${x}.png`);
}

const msnry = new Masonry('.nugrid', {
  itemSelector: '.cegio',
  gutter: 15,
  // stagger: 30,
  transitionDuration: 0,
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
      msnry.remove($$('.cegio'));
      $('.nugrid').append(html);
      msnry.appended(html);
    } else {
      $('.nugrid').append(html);
    }
    if (!data.length) return;
    const imgloaded = Array.from($$(`[data-fnum='${window.cegpage}']`));
    const parentsloaded = imgloaded.map(img => img.parentElement.parentElement);
    const next10array = parentsloaded[0].dataset.nextten.split(',');
    imagesLoaded('.nugrid', function() {
      msnry.appended(html);
      msnry.layout();
      parentsloaded.forEach(parent => {
        parent.classList.remove('cegio__notyetloaded');
        parent.firstElementChild.firstElementChild.firstElementChild.innerHTML =
          parent.firstElementChild.firstElementChild.dataset.html;
      });
      imgloaded.forEach(img => {
        img.src = img.dataset.src;
      });
      window.cegbusy = false;
      imagesLoaded('.nugrid', function() {
        const next10mini = createnext10mini(next10array);
        const next10 = createnext10(next10array);
        preloadImages(next10mini)
          .then(
            function(imgs) {
              console.log(imgs, 'small loaded');
              // all images are loaded now and in the array imgs
            },
            function(errImg) {
              // at least one image failed to load
            }
          )
          .then(
            preloadImages(next10).then(
              function(imgs) {
                console.log(imgs, 'big loaded');
                // all images are loaded now and in the array imgs
              },
              function(errImg) {
                // at least one image failed to load
              }
            )
          );
      });
      if (window.innerWidth < 930) {
        cegimobtap(parentsloaded);
      }
    });
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
      if (window.cegbusy) {
        return;
      }
      if (
        Math.round(window.innerHeight + window.scrollY + 200) >=
        document.body.offsetHeight
      ) {
        nuLoad(false);
        window.cegbusy = true;
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
