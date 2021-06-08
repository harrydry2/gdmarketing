import './sass/styles.sass';
import axios from 'axios';
import Masonry from 'masonry-layout';
import debounce from 'lodash.debounce';
import { $, $$ } from './modules/bling';
import { postPopup } from './modules/postPopup';
import { resize, copyGif, gifStart } from './modules/gifs';
import {
  resizeCegAll,
  cegLoad,
  cegLoadScroll,
  cegFilter,
  cegMobileFilter,
} from './modules/ceg';

import { nuLoad, nuLoadScroll, nuFilter } from './modules/nu';
import {
  imgObserver,
  fedLoadScroll,
  fedFilter,
  cegimobtap,
} from './modules/fed';
import { thScroll, courseScroll } from './modules/thScroll';
// import { thScroll, courseScroll } from './modules/thScroll1';

import { cycleImages } from './modules/course';
import {
  mailPopup,
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

if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
  lazyLoad(filterArray);
}

if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
  console.log('books');
  filterArray.forEach(filterItem => {
    filterItem.on('click', async e => {
      // reset page settings for new filters
      e.preventDefault();
      window.page = 2;
      window.busy = false;
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
        window.history.pushState('', '', `/${activeFilters}`);
        // axios the filtered marketing ideas
        var { data } = await axios.get(`/api/lazy/1/${activeFilters}`);
      }
      $('.outerCard').innerHTML = data;
      // popup after dynamically inserted
      postPopup(Array.from($$('.card')));
    });
  });
}

if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
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
}

// mailPopup
if (
  !$('.gif') &&
  !$('.th') &&
  !$('.cc') &&
  !$('.ceg') &&
  !$('.cegM') &&
  !$('.fed')
) {
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
if ($('.postNoScroll')) {
  mailSubmitFromPost();
}

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

// th page
if ($('.th')) {
  // mailPopup();
  thScroll();
  mailSubmitFromHandbook();
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

if ($('.ceg')) {
  // window.addEventListener('load', resizeCEG);
  cegLoad(false);
  cegLoadScroll();
  cegFilter();
  if (window.innerWidth < 930) {
    cegMobileFilter();
  }
  window.on('resize', debounce(async () => resizeCegAll(), 100));
}

if ($('.fed')) {
  imgObserver();
  fedLoadScroll();
  fedFilter();
  $$('.cegi').forEach(parent => {
    parent.firstElementChild.firstElementChild.innerHTML =
      parent.firstElementChild.dataset.html;
  });
  if (window.innerWidth < 930) {
    cegMobileFilter();
    cegimobtap($$('.cegio'));
  }

  // canvas setup
  // const canvas = document.querySelector('canvas');
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  // const ctx = canvas.getContext('2d');

  // // watch for browser resizing, reinitialize stars
  // window.addEventListener('resize', function() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   init();
  // });

  // function Star(x, y, width, speed) {
  //   this.x = x;
  //   this.y = y;
  //   this.width = width;
  //   this.speed = speed;
  //   this.color = '#fff';

  //   this.draw = function() {
  //     ctx.fillStyle = this.color;
  //     ctx.fillRect(this.x, this.y, width, width);
  //   };

  //   this.update = () => {
  //     // check bounds
  //     if (this.y + this.width > innerWidth) {
  //       this.y = 0;
  //     }
  //     this.y += this.speed;

  //     this.draw();
  //   };
  // }

  // // Star dimensions and speed
  // const stars = {
  //   midStar: {
  //     width: 2,
  //     speed: 0.6,
  //   },
  //   farStar: {
  //     width: 1,
  //     speed: 0.4,
  //   },
  // };

  // let starArray = [];

  // // clear starArray and generate 3 layers of stars randomly
  // function init() {
  //   starArray = [];
  //   // nearest stars
  //   // mid-distance stars
  //   for (let i = 0; i < 200; ++i) {
  //     const x = Math.random() * (innerWidth - stars.midStar.width);
  //     const y = Math.random() * (innerHeight - stars.midStar.width);
  //     starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
  //   }

  //   // farthest stars
  //   for (let i = 0; i < 400; ++i) {
  //     const x = Math.random() * (innerWidth - stars.farStar.width);
  //     const y = Math.random() * (innerHeight - stars.farStar.width);
  //     starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
  //   }
  // }

  // // loop to call update function on each star
  // function animate() {
  //   requestAnimationFrame(animate);
  //   ctx.clearRect(0, 0, innerWidth, innerHeight);

  //   for (const star of starArray) {
  //     star.update();
  //   }
  // }

  // init();
  // animate();
}
