/* eslint-disable no-var */
import zen from 'zenscroll';
import debounce from 'lodash.debounce';
import { $, $$ } from './bling';

export function thScroll() {
  $('.thczz1').on('click', () => {
    zen.center($('.thcz1'));
  });
  $('.thczz2').on('click', () => {
    zen.center($('.thcz2'));
  });
  $('.thczz3').on('click', () => {
    zen.center($('.thcz3'));
  });
  $('.thczz4').on('click', () => {
    zen.center($('.thcz4'));
  });
  $('.thczz5').on('click', () => {
    zen.center($('.thcz5'));
  });
  $('.thczz6').on('click', () => {
    zen.center($('.thcz6'));
  });
  $('.thczz7').on('click', () => {
    zen.center($('.thcz7'));
  });
  $('.thczz8').on('click', () => {
    zen.center($('.thcz8'));
  });
  $('.thczz9').on('click', () => {
    zen.center($('.thcz9'));
  });
  $('.thczz10').on('click', () => {
    zen.center($('.thcz10'));
  });
  $('.thczz11').on('click', () => {
    zen.center($('.thcz11'));
  });
  $('.thczz12').on('click', () => {
    zen.center($('.thcz12'));
  });
  $('.thczz13').on('click', () => {
    zen.center($('.thcz13'));
  });
  $('.thczz14').on('click', () => {
    zen.center($('.thcz14'));
  });
  $('.thczz15').on('click', () => {
    zen.center($('.thcz15'));
  });
  $('.thczz16').on('click', () => {
    zen.center($('.thcz16'));
  });
  $('.thczz17').on('click', () => {
    zen.center($('.thcz17'));
  });
}

export function courseScroll() {
  // easier shit
  var tweets = $('.tweets');
  var leftMenu = $('.left__menu');
  var spm = $('.spm');

  // var menuObserver2 = new window.IntersectionObserver(
  //   ([entry]) => {
  //     if (entry.isIntersecting) {
  //       // enter
  //       leftMenu.classList.remove('left__menu-active');
  //       return;
  //     }
  //     if (entry.boundingClientRect.top > 0) {
  //       // below
  //       if (!leftMenu.classList.contains('left__menu-active')) {
  //         leftMenu.classList.add('left__menu-active');
  //       }
  //     }
  //   },
  //   {
  //     root: null,
  //     threshold: 0,
  //   }
  // );

  const menuObserver = ([entry]) => {
    console.log(entry, 'is it action?');
    if (entry.isIntersecting) {
      leftMenu.classList.remove('left__menu-active');
      return;
    }
    if (entry.boundingClientRect.top > 0) {
      console.log('lesgo');
    } else {
      leftMenu.classList.add('left__menu-active');
    }
  };

  function createObserver() {
    let observer;

    const options = {
      root: null,
    };

    observer = new IntersectionObserver(menuObserver, options);
    observer.observe(spm);
  }

  window.addEventListener(
    'load',
    e => {
      createObserver();
    },
    false
  );

  // window.on(
  //   'scroll',
  //   debounce(function() {
  //     if (window.scrollY < 2000) {
  //       menuObserver.observe(spm);
  //     } else {
  //       menuObserver2.observe(tweets);
  //     }
  //   }, 100)
  // );

  // hard shit
  // var currentlyOn = 1;
  // const observer = new window.IntersectionObserver(
  //   ([entry]) => {
  //     if (entry.isIntersecting) {
  //       // enter
  //       var num = entry.target.className.slice(-1);
  //       var newnum = (parseInt(num) + 1).toString();
  //       var newCurrentlyOn = parseInt(num);
  //       if (currentlyOn > newCurrentlyOn) {
  //         const lmi = $(`.ccsc${num}a`);
  //         const lmiNext = $(`.ccsc${newnum}a`);
  //         lmi.classList.remove('strike');
  //         lmi.classList.add('strike__active');
  //         lmiNext.classList.contains('strike__active')
  //           ? lmiNext.classList.remove('strike__active')
  //           : null;
  //       }
  //       return;
  //     }
  //     if (entry.boundingClientRect.top > 0) {
  //       // below
  //     } else {
  //       // above
  //       const num = entry.target.className.slice(-1);
  //       if (parseInt(num) === 4) {
  //         return;
  //       }
  //       const newnum = (parseInt(num) + 1).toString();
  //       console.log(num);
  //       const lmi = $(`.ccsc${num}a`);
  //       const lmiNext = $(`.ccsc${newnum}a`);
  //       currentlyOn = parseInt(num) + 1;
  //       lmi.classList.add('strike');
  //       lmi.classList.contains('strike__active')
  //         ? lmi.classList.remove('strike__active')
  //         : null;
  //       lmiNext.classList.add('strike__active');
  //     }
  //   },
  //   {
  //     root: null,
  //     threshold: 0,
  //   }
  // );

  // const Arrayof = $$('.ccLetter');
  // Arrayof.forEach(el => {
  //   observer.observe(el);
  // });

  zen.setup(null, 30);
  $('.ccsc1a').on('click', () => {
    zen.to($('.ccsc1'));
  });
  $('.ccsc2a').on('click', () => {
    zen.to($('.ccsc2'));
  });
  $('.ccsc3a').on('click', () => {
    zen.to($('.ccsc3'));
  });
  $('.ccsc4a').on('click', () => {
    zen.to($('.ccsc4'));
  });
}
