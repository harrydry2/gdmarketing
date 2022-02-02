import './sass/styles.sass';
import axios from 'axios';
import Masonry from 'masonry-layout';
import debounce from 'lodash.debounce';

import { $, $$ } from './modules/bling';
import { postPopup } from './modules/postPopup';
import { resize, copyGif, gifStart } from './modules/gifs';
import {
  initObserver,
  fedLoadScroll,
  fedFilter,
  cegimobtap,
  toggle,
  cegMobileFilter,
  cegMobileNewsletter,
} from './modules/fed';
import { thScroll, courseScroll } from './modules/thScroll';
// import { thScroll, courseScroll } from './modules/thScroll1';

import { cycleImages } from './modules/course';
import {
  mailPopup,
  actualPopup,
  mailSubmitFromPost,
  mailSubmitHome,
  mailSubmitFromHandbook,
  mailSubmitFromCourseTop,
  mailSubmitFromCourseBottom,
} from './modules/mailPopup';
import { lazyLoad, gifLoad, gifLoadMobile } from './modules/lazyLoad';

window.page = 2;
window.cegpage = 1;
window.busy = false;
window.beenDone = false;
window.gifbusy = false;
window.cegbusy = false;
// 1) Deals with the filter across screens

let filterArray;
const array = Array.from($$('.filters__spec'));
const arrayLength = array.length;

if (window.innerWidth < 768) {
  filterArray = array.slice(arrayLength / 2, arrayLength);
} else {
  filterArray = array.slice(0, arrayLength / 2);
}

// wierdthingforanimation

if ($('.pausedatanimation')) {
  $('.ph').style.animationPlayState = 'paused';
}

if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
  lazyLoad(filterArray);
  if (window.innerWidth < 1025) {
    // cegMobileFilter();
    cegMobileNewsletter();
    cegMobileFilter();
    // cegimobtap($$(".cegio"));
  }
}

if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
  // preSetuptogetexisitingoldnum
  let currentnum;
  let oldnum;
  const fcString = $('.filterContainer').className;
  if (fcString.includes(' ')) {
    console.log(fcString.length);
    if (fcString.length > 35) {
      oldnum = fcString.slice(-2);
    } else {
      oldnum = fcString.slice(-1);
    }
  } else {
    oldnum = '0';
  }
  console.log(oldnum);
  filterArray.forEach(filterItem => {
    filterItem.on('click', async e => {
      currentnum = e.currentTarget.dataset.num;
      // reset page settings for new filters
      e.preventDefault();
      window.page = 2;
      window.busy = false;
      // toggle active state
      e.currentTarget.parentElement.parentElement.classList.toggle(
        `cegfilters__active${currentnum}`
      );
      // remove parent filters already there.
      e.currentTarget.parentElement.parentElement.classList.remove(
        `cegfilters__active${oldnum}`
      );
      // remove any filters active already there
      if (oldnum === currentnum) {
        e.currentTarget.classList.toggle('filters__active');
      } else {
        filterArray.forEach(filter => {
          filter.classList.remove(`filters__active`);
        });
        e.currentTarget.classList.toggle('filters__active');
      }
      // array of active filters
      const activeFilters = filterArray
        .filter(filter => filter.classList.contains('filters__active'))
        .map(filter => filter.dataset.term);
      // if no filters default to all
      if (activeFilters.length === 0) {
        window.history.pushState('', '', `/`);
        var { data } = await axios.get(`/api/lazy/1/all`);
      } else {
        // change push state
        window.history.pushState('', '', `/${activeFilters}`);
        // axios the filtered marketing ideas
        var { data } = await axios.get(`/api/lazy/1/${activeFilters}`);
      }
      oldnum = currentnum;
      $('.outerCard').innerHTML = data;
      // popup after dynamically inserted
      postPopup(Array.from($$('.card')));
    });
  });
}

// if (
//   !$(".gif") &&
//   !$(".th") &&
//   !$(".cc") &&
//   !$(".ceg") &&
//   !$(".cegM") &&
//   !$(".fed")
// ) {
//   const hmButton = $(".hm__button");
//   const hmFilters = $(".hm__filters");
//   hmButton.on("click", () => {
//     const it1 = "Show filters";
//     const it2 = "Show marketing ideas";
//     if (hmButton.innerText === it1) {
//       hmButton.innerText = it2;
//     } else {
//       hmButton.innerText = it1;
//     }
//     hmFilters.classList.toggle("hm__filters-active");
//     $(".iosOverflow").classList.toggle("noScroll");
//   });
// }

// mailPopup
if (!$('.gif') && !$('.th') && !$('.cc') && !$('.ceg') && !$('.cegM')) {
  if (!window.location.href.includes('utm_source=newsletter')) {
    mailPopup();
  } else {
    console.log('no more emails popups for loving subs');
  }
  mailSubmitHome();
}

//

if ($('.undera__center-text')) {
  if (window.innerWidth > 768) {
    $('.undera__center-text').innerText = 'CLICK ICON TO SHARE';
  }
}

// only if Post page
// now disabled
// if ($('.postNoScroll')) {
//   mailSubmitFromPost();
// }

// popup from homepage (also if close post page)
if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
  postPopup(Array.from($$('.card')));
}

// gif page
if ($('.gif')) {
  mailPopup();
  copyGif();
  // if (window.innerWidth > 768) {
  window.addEventListener('load', resize);
  window.addEventListener('resize', resize);
  gifLoad();
}

if ($('.cc')) {
  if (window.innerWidth > 1023) {
    courseScroll();
  }
  mailSubmitFromCourseTop();
  mailSubmitFromCourseBottom();
  setTimeout(() => {
    const tc = $('.tweets__container');
    console.log('hello');
    tc.style.display = 'grid';
    tc.style.height = 'auto';
  }, 2000);
}

// if ($(".ceg")) {
//   // window.addEventListener('load', resizeCEG);
//   cegLoad(false);
//   cegLoadScroll();
//   cegFilter();
//   if (window.innerWidth < 930) {
//     cegMobileFilter();
//   }
//   window.on("resize", debounce(async () => resizeCegAll(), 100));
// }

if ($('.fed')) {
  mailPopup();
  const msnry = new Masonry('.fedgrid', {
    // options
    itemSelector: '.cegio',
    gutter: window.gutter,
    transitionDuration: 0,
  });
  msnry.layout();
  $('.fedgrid').style.opacity = 1;
  initObserver();
  fedFilter();
  toggle();
  if (window.innerWidth < 1026) {
    cegMobileFilter();
    cegMobileNewsletter();
  }
  cegimobtap($$('.cegio'));
  $('.handbook__bottom').on('click', () => {
    actualPopup();
  });
  // if ($('.cmtGlitchClick')) {
  //   $('.cmtGlitchClick').on('click', () => {
  //     actualPopup();
  //   });
  // }
  history.scrollRestoration = 'manual';
}
