/* eslint-disable no-var */
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { $, $$ } from './bling';

// mail

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function submitMail(button, red, input, num) {
  var numm = num;
  button.on('click', async () => {
    if (
      $('.iosOverflow') &&
      $('.iosOverflow').classList.contains('number5chanel')
    ) {
      numm = 5;
    }
    red.style.display = 'block';
    if (validateEmail(input.value)) {
      window.localStorage.setItem('onEmailList', 'true');
      const { data } = await axios.post('/api/subscribe', {
        email: input.value,
        num: numm,
      });
      if (data.email === 'true') {
        red.style.color = '#00c26e';
        red.innerText = `Just sent confirmation - check spam :)`;
      }
      if (data.email === 'duplicate') {
        red.style.color = '#D0021B';
        red.innerText = 'Email already signed up';
      }
      if (data.email === 'dunno') {
        red.style.color = '#D0021B';
        red.innerText = 'Unknown error. Tweet @harrydry';
      }
    } else {
      red.style.color = '#D0021B';
      red.innerText = 'Not a valid email. Try again.';
    }
    input.value = '';
  });
}

function mouseoutFun(e) {
  if (e.toElement === null && e.relatedTarget === null) {
    $('.outerMail').style.display = 'flex';
    $('.iosOverflow').classList.add('mailNoScroll');
    $('.iosOverflow').classList.add('number5chanel');
    document.removeEventListener('mouseout', mouseoutFun);
  }
}

export function mailPopup() {
  const mailButton = $('.mail__bc .mail__button');
  const mailInput = $('.mail__bc .mail__input > input');
  const mailRed = $('.mail__bc .mail__bc-red');
  const outerMail = $('.outerMail');
  const mailClose = $('.mail__icon');

  const lsMail = window.localStorage.getItem('lsmail');
  const onEmailList = window.localStorage.getItem('onEmailList');
  const howLongSinceClosed = differenceInDays(new Date(), lsMail);
  var alreadyPoppedUp = false;
  var emailNum = 4;

  if ($('.outerMailActive')) {
    outerMail.style.display = 'flex';
    $('.iosOverflow').classList.add('mailNoScroll');
    alreadyPoppedUp = true;
  }

  if (
    onEmailList !== 'true' &&
    !alreadyPoppedUp &&
    (lsMail == null || howLongSinceClosed > 3)
  ) {
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        $('.outerMail').style.display = 'flex';
        $('.iosOverflow').classList.add('mailNoScroll');
        $('.iosOverflow').classList.add('number5chanel');
      }, 30000);
    } else {
      setTimeout(() => {
        document.addEventListener('mouseout', mouseoutFun);
      }, 5000);
    }
  }

  mailClose.on('click', () => {
    window.localStorage.setItem('lsmail', new Date());
    outerMail.style.display = 'none';
    $('.iosOverflow').classList.remove('mailNoScroll');
    alreadyPoppedUp = true;
  });
  submitMail(mailButton, mailRed, mailInput, emailNum);
}

export function mailSubmitHome() {
  const mailButtonSpec = $('.search__text');
  const mailInputSpec = $('.search__left > input');
  const mailRedSpec = $('.search__text-info');
  submitMail(mailButtonSpec, mailRedSpec, mailInputSpec, 1);
}

export function mailSubmitFromPost() {
  const mailButtonSpec = $('.postEmail .mail__button');
  const mailInputSpec = $('.postEmail .mail__input > input');
  const mailRedSpec = $('.postEmail .mail__bc-red');
  submitMail(mailButtonSpec, mailRedSpec, mailInputSpec, 2);
}

export function mailSubmitAddOn() {
  const mailButtonSpec = $('.addOnEmail .mail__button');
  const mailInputSpec = $('.addOnEmail .mail__input > input');
  const mailRedSpec = $('.addOnEmail .mail__bc-red');
  submitMail(mailButtonSpec, mailRedSpec, mailInputSpec, 3);
}

// 1 - home
// 2 - on page
// 3 - on page ajax
// 4 - direct
// 5 - popup
