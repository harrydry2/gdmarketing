import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { $, $$ } from './bling';

// mail

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function mailPopup() {
  const mailButton = $('.mail__button');
  const mailInput = $('.mail__input > input');
  const mailRed = $('.mail__bc-red');
  const outerMail = $('.outerMail');
  const mailClose = $('.mail__icon');

  const lsMail = window.localStorage.getItem('lsmail');
  const onEmailList = window.localStorage.getItem('onEmailList');
  const howLongSinceClosed = differenceInDays(new Date(), lsMail);
  let alreadyPoppedUp = false;

  if ($('.outerMailActive')) {
    outerMail.style.display = 'flex';
    $('body').classList.add('mailNoScroll');
    alreadyPoppedUp = true;
  }

  if (
    onEmailList !== 'true' &&
    !alreadyPoppedUp &&
    (lsMail == null || howLongSinceClosed > 3)
  ) {
    setTimeout(() => {
      outerMail.style.display = 'flex';
      $('body').classList.add('mailNoScroll');
    }, 3000);
  }

  mailClose.on('click', () => {
    window.localStorage.setItem('lsmail', new Date());
    outerMail.style.display = 'none';
    $('body').classList.remove('mailNoScroll');
  });

  mailButton.on('click', async () => {
    mailRed.style.display = 'block';
    if (validateEmail(mailInput.value)) {
      window.localStorage.setItem('onEmailList', 'true');
      await axios.post('/api/subscribe', {
        email: mailInput.value,
      });
      mailRed.style.color = '#00c26e';
      mailRed.innerText = `Sweet! Just sent an email :)`;
    } else {
      mailRed.style.color = '#D0021B';
      mailRed.innerText = 'Not a valid email. Try again.';
    }
  });
}
