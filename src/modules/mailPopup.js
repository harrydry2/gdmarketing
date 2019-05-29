import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { $, $$ } from './bling';

// mail

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function submitMail(button, red, input) {
  button.on('click', async () => {
    red.style.display = 'block';
    if (validateEmail(input.value)) {
      window.localStorage.setItem('onEmailList', 'true');
      await axios.post('/api/subscribe', {
        email: input.value,
      });
      red.style.color = '#00c26e';
      red.innerText = `Sweet! Look out for an email sooooon :)`;
    } else {
      red.style.color = '#D0021B';
      red.innerText = 'Not a valid email. Try again.';
    }
  });
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
  let alreadyPoppedUp = false;

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
    setTimeout(() => {
      outerMail.style.display = 'flex';
      $('.iosOverflow').classList.add('mailNoScroll');
    }, 40000);
  }

  mailClose.on('click', () => {
    window.localStorage.setItem('lsmail', new Date());
    outerMail.style.display = 'none';
    $('.iosOverflow').classList.remove('mailNoScroll');
  });

  submitMail(mailButton, mailRed, mailInput);
}

export function mailSubmitFromPost() {
  const mailButtonSpec = $('.postEmail .mail__button');
  const mailInputSpec = $('.postEmail .mail__input > input');
  const mailRedSpec = $('.postEmail .mail__bc-red');
  submitMail(mailButtonSpec, mailRedSpec, mailInputSpec);
}

export function mailSubmitAddOn() {
  const mailButtonSpec = $('.addOnEmail .mail__button');
  const mailInputSpec = $('.addOnEmail .mail__input > input');
  const mailRedSpec = $('.addOnEmail .mail__bc-red');
  submitMail(mailButtonSpec, mailRedSpec, mailInputSpec);
}
