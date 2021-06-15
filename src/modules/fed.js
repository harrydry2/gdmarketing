/* eslint-disable no-var */
import axios from 'axios';
import debounce from 'lodash.debounce';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { $, $$ } from './bling';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const msnry = new Masonry('.fedgrid', {
  itemSelector: '.cegio',
  gutter: 15,
  // stagger: 30,
  transitionDuration: 0,
});

function preloadImage(url) {
  var img = new Image();
  img.src = url;
}

// function preloadImages(srcs) {
//   function loadImage(src) {
//     return new Promise(function(resolve, reject) {
//       const img = new Image();
//       img.onload = function() {
//         resolve(img);
//       };
//       img.onerror = img.onabort = function() {
//         reject(src);
//       };
//       img.src = src;
//     });
//   }
//   const promises = [];
//   for (let i = 0; i < srcs.length; i++) {
//     promises.push(loadImage(srcs[i]));
//   }
//   return Promise.all(promises);
// }

export function cegimobtap(parents) {
  console.log('are we loading this?');
  parents.forEach(parent => {
    parent.on('click', e => {
      parent.classList.toggle('cegimobtap');
    });
  });
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

function horribleFilterFunction(cegFilterArray) {
  var oldtopnum = '0';
  var oldbotnum = '0';
  var currentnum;
  cegFilterArray.forEach(filterItem => {
    filterItem.on('click', async e => {
      currentnum = e.currentTarget.dataset.num;
      window.beenDone = true;
      if (parseInt(currentnum) < 7) {
        // esge
        if (oldtopnum === currentnum) {
          e.currentTarget.parentElement.classList.toggle(
            `cegfilters__active${currentnum}`
          );
          e.currentTarget.classList.toggle(`cegfilter__active`);
        } else {
          // remove
          if (oldtopnum !== '0') {
            e.currentTarget.parentElement.classList.remove(
              `cegfilters__active${oldtopnum}`
            );
            $$('.fth').forEach(ele => {
              ele.classList.remove(`cegfilter__active`);
            });
          }
          // add
          e.currentTarget.parentElement.classList.toggle(
            `cegfilters__active${currentnum}`
          );
          e.currentTarget.classList.toggle(`cegfilter__active`);
        }
        oldtopnum = currentnum;
      } else {
        // esge
        if (oldbotnum === currentnum) {
          e.currentTarget.parentElement.classList.toggle(
            `cegfilters__active${currentnum}`
          );
          e.currentTarget.classList.toggle(`cegfilter__active`);
        } else {
          // remove
          if (oldbotnum !== '0') {
            e.currentTarget.parentElement.classList.remove(
              `cegfilters__active${oldbotnum}`
            );
            $$('.bth').forEach(ele => {
              ele.classList.remove(`cegfilter__active`);
            });
          }
          // add
          e.currentTarget.parentElement.classList.toggle(
            `cegfilters__active${currentnum}`
          );
          e.currentTarget.classList.toggle(`cegfilter__active`);
        }
        oldbotnum = currentnum;
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      window.cegpage = 1;
      fedLoad(true);
    });
  });
}

const scrollObserver = new IntersectionObserver(
  function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        fedLoad(false);
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
  }
);

const imageObserver = new IntersectionObserver(
  function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        var imgLoad = imagesLoaded(image);
        imgLoad.on('done', () => {
          image.classList.remove('fed__lazy');
          image.classList.add('fed__loaded');
          imageObserver.unobserve(image);
        });
        imgLoad.on('fail', () => {
          console.log('imgfailed. run it back');
          image.src = image.dataset.src;
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body;
}

export function initObserver() {
  const initimgsArray = $$('.fed__lazy');
  // var initimgLoad = imagesLoaded(initimgsArray);
  $$('.cegi').forEach(parent => {
    parent.firstElementChild.firstElementChild.innerHTML =
      parent.firstElementChild.dataset.html;
  });
  // initimgLoad.on('done', () => {
  //   msnry.layout();
  // });
  initimgsArray.forEach(image => imageObserver.observe(image));
  scrollObserver.observe(initimgsArray[1]);
}

function getFilterParam() {
  // const cegFilterArray = Array.from($$(".cegl__filter-tab"));
  const cegFilterArray =
    window.innerWidth < 1026
      ? Array.from($$('.cegm__bottom-tab'))
      : Array.from($$('.cegl__filter-tab'));
  const activeFilters = cegFilterArray
    .filter(filter => filter.classList.contains('cegfilter__active'))
    .map(each => each.dataset.num)
    .join('-');
  if (activeFilters.length === 0) {
    return window.beenDone ? 'beenDone' : 'all';
  }
  return activeFilters;
}

export async function fedLoad(filter) {
  const filterParam = getFilterParam();
  try {
    const { data } = await axios.get(
      `/api/lazyceg/${window.cegpage}/${filterParam}`
    );
    const html = stringToHTML(data);
    if (!data.length) return;
    if (filter || filterParam === 'beenDone') {
      msnry.remove($$('.cegio'));
      $('.fedgrid').append(html);
      msnry.appended(html);
      msnry.layout();
      window.beenDone = false;
    } else {
      $('.fedgrid').append(html);
      msnry.appended(html);
      msnry.layout();
    }
    const imgloadedArray = Array.from($$(`[data-fnum='${window.cegpage}']`));
    // preload and observe
    imgloadedArray.forEach(image => {
      console.log(image.dataset.src, 'bing');
      preloadImage(image.dataset.src);
      imageObserver.observe(image);
    });
    scrollObserver.observe(imgloadedArray[1]);
    // image load stuff not needed
    // const imgLoad = imagesLoaded(imgloadedArray);
    // imgLoad.on("done", () => {
    //   console.log(" allloaded bingo");
    // });
    // imgLoad.on("fail", () => {
    //   console.log("imgfailed. run it back");
    //   image.src = image.dataset.src;
    // });
    // innerHTML
    const parentsloaded = imgloadedArray.map(
      img => img.parentElement.parentElement.parentElement
    );
    parentsloaded.forEach(parent => {
      parent.firstElementChild.firstElementChild.innerHTML =
        parent.firstElementChild.dataset.html;
    });
    window.cegbusy = false;
    if (window.innerWidth < 1026) {
      cegimobtap(parentsloaded);
    }
    if (data.length) {
      window.cegpage += 1;
    }
  } catch (e) {
    console.log(e);
  }
}

// export function fedLoadScroll() {
//   window.on(
//     'scroll',
//     debounce(async () => {
//       if (window.cegbusy) {
//         return;
//       }
//       if (
//         Math.round(window.innerHeight + window.scrollY + 1200) >=
//         document.body.offsetHeight
//       ) {
//         fedLoad(false);
//         window.cegbusy = true;
//       }
//     }, 100)
//   );
// }

export function fedFilter() {
  const cegFilterArray =
    window.innerWidth < 1026
      ? Array.from($$('.cegm__bottom-tab'))
      : Array.from($$('.cegl__filter-tab'));
  horribleFilterFunction(cegFilterArray);
}
