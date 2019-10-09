import axios from 'axios';
import { $, $$ } from './bling';
import { postPopup } from './postPopup';
import { resize, copyGif } from './gifs';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export function lazyLoad(filterArray) {
  window.onscroll = async () => {
    if (window.busy) {
      return;
    }
    if (
      Math.round(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      window.busy = true;
      // get active filters
      const activeFilters = filterArray
        .filter(filter => filter.classList.contains('filters__active'))
        .map(filter => filter.dataset.term)
        .join('-');
      // set filter param
      const filterParam = activeFilters.length === 0 ? 'all' : activeFilters;
      try {
        const { data } = await axios.get(
          `/api/lazy/${window.page}/${filterParam}`
        );
        $('.outerCard').insertAdjacentHTML('beforeend', data);
        postPopup(Array.from($$('.card')));
        if (data.length) {
          window.page += 1;
        } else {
          return;
        }
        window.busy = false;
      } catch (err) {
        console.log(err);
      }
    }
  };
}

const box1 = `<div class="harryGIF">
<div class="harryGIF__inner">
    <div class="harryGIF__inner-img"></div>
    <div class="harryGIF__inner-p">Yo I'm Harry! I hope you like the Gifs. Recently, I went full time on Marketing Examples. It’s like Dribbble for Marketing. Would really appreciate it if you had a look.</div>
    <a class="harryGIF__inner-button" href="/">Check it out</a>
</div>
</div>`;

const box2 = `<div class="harryGIF">
<div class="harryGIF__inner">
    <div class="harryGIF__inner-logo-down"><?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 37 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="lander" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard" transform="translate(-344.000000, -17.000000)">
            <g id="Group-2" transform="translate(346.000000, 19.000000)">
                <circle id="Oval" stroke="#4742DE" stroke-width="2.5" fill="#FFFFFF" cx="16.5" cy="16.5" r="16.5"></circle>
                <g id="Idea" transform="translate(7.218750, 7.218750)" fill="#4742DE">
                    <path d="M9.86754745,2.19458128 C10.1690706,2.19458128 10.4135033,1.90126195 10.4135033,1.53943422 L10.4135033,0.66590481 C10.4135033,0.304077081 10.1690706,0.0107577514 9.86754745,0.0107577514 C9.56602434,0.0107577514 9.32159157,0.304077081 9.32159157,0.66590481 L9.32159157,1.53943422 C9.32159157,1.90126195 9.56602434,2.19458128 9.86754745,2.19458128 Z" id="Shape"></path>
                    <path d="M17.4017386,6.56222834 L16.5282092,6.56222834 C16.1663815,6.56222834 15.8730622,6.80666111 15.8730622,7.10818422 C15.8730622,7.40970733 16.1663815,7.6541401 16.5282092,7.6541401 L17.4017386,7.6541401 C17.7635664,7.6541401 18.0568857,7.40970733 18.0568857,7.10818422 C18.0568857,6.80666111 17.7635664,6.56222834 17.4017386,6.56222834 Z" id="Shape"></path>
                    <path d="M2.77012098,7.10818422 C2.77012098,6.80666111 2.47680165,6.56222834 2.11497392,6.56222834 L1.24144451,6.56222834 C0.879616779,6.56222834 0.58629745,6.80666111 0.58629745,7.10818422 C0.58629745,7.40970733 0.879616779,7.6541401 1.24144451,7.6541401 L2.11497392,7.6541401 C2.47680165,7.6541401 2.77012098,7.40970733 2.77012098,7.10818422 Z" id="Shape"></path>
                    <path d="M14.4362641,4.37840481 C14.6344894,4.37822996 14.8245322,4.29918685 14.9646114,4.15865324 L15.6723975,3.45444936 C15.9468977,3.15927331 15.938798,2.69929335 15.6540766,2.4140038 C15.3693551,2.12871425 14.9102911,2.12059844 14.6157028,2.39564635 L13.9079167,3.09985024 C13.6943644,3.31409485 13.6305262,3.63608609 13.7461358,3.91585125 C13.8617454,4.1956164 14.1340677,4.37813848 14.4362641,4.37840481 Z" id="Shape"></path>
                    <path d="M4.75161084,3.10766328 L4.03793802,2.39738167 C3.74089959,2.11995992 3.27801746,2.12814577 2.99092792,2.41589756 C2.70383837,2.70364934 2.69567135,3.1675992 2.97245464,3.46532281 L3.68612747,4.17560442 C3.98316589,4.45302617 4.44604803,4.44484032 4.73313757,4.15708854 C5.02022712,3.86933676 5.02839413,3.40538689 4.75161084,3.10766328 L4.75161084,3.10766328 Z" id="Shape"></path>
                    <path d="M16.0489674,12.2245876 C15.751929,11.9471658 15.2890469,11.9553517 15.0019573,12.2431034 C14.7148678,12.5308552 14.7067008,12.9948051 14.9834841,13.2925287 L15.6971569,14.0028103 C15.9941953,14.2802321 16.4570774,14.2720462 16.744167,13.9842944 C17.0312565,13.6965426 17.0394235,13.2325928 16.7626403,12.9348692 L16.0489674,12.2245876 Z" id="Shape"></path>
                    <path d="M2.59421571,12.2245876 L1.88054288,12.9348692 C1.60375959,13.2325928 1.6119266,13.6965426 1.89901615,13.9842944 C2.1861057,14.2720462 2.64898783,14.2802321 2.94602625,14.0028103 L3.65969908,13.2925287 C3.93648237,12.9948051 3.92831536,12.5308552 3.64122581,12.2431034 C3.35413626,11.9553517 2.89125413,11.9471658 2.59421571,12.2245876 Z" id="Shape"></path>
                    <path d="M14.781145,8.6624932 C14.7848926,6.02892083 12.8451236,3.78161497 10.2018321,3.35716216 C7.55854055,2.93270934 4.99247687,4.45648041 4.14399298,6.95440725 C3.29550908,9.45233409 4.4152221,12.1866028 6.78735734,13.4093366 C6.6657342,13.5944791 6.60076664,13.8100826 6.60018573,14.0304905 L6.60018573,15.1807757 C6.60018573,16.4513456 7.64768054,17.481346 8.93983089,17.481346 L9.71971261,17.481346 C11.0118629,17.481346 12.0593578,16.4513456 12.0593578,15.1807757 L12.0593578,14.0304905 C12.0587769,13.8100826 11.9938093,13.5944791 11.8721862,13.4093366 C13.6617578,12.4796368 14.7813552,10.6526762 14.781145,8.6624932 Z M10.8817364,14.0304905 L10.8817364,14.4139189 L8.93203207,14.4139189 C8.60899448,14.4139189 8.34712078,14.671419 8.34712078,14.9890615 C8.34712078,15.306704 8.60899448,15.5642041 8.93203207,15.5642041 L10.811547,15.5642041 C10.6467002,16.0226804 10.2064582,16.3296942 9.71191379,16.3310608 L8.93203207,16.3310608 C8.2859569,16.3310608 7.76220949,15.8160606 7.76220949,15.1807757 L7.76220949,14.0304905 L10.8817364,14.0304905 Z M9.32197293,12.8802054 L9.32197293,12.8802054 C6.95303064,12.8802054 5.03262347,10.9918713 5.03262347,8.6624932 C5.03262347,6.33311507 6.95303064,4.444781 9.32197293,4.444781 C11.6909152,4.444781 13.6113224,6.33311507 13.6113224,8.6624932 C13.6113229,9.78176468 13.1588753,10.8551378 12.3536227,11.6462225 C11.5483701,12.4373073 10.4563552,12.8812229 9.31807352,12.8802054 L9.32197293,12.8802054 Z" id="Shape"></path>
                    <path d="M9.81295186,5.47031657 C9.54158106,5.47031657 9.32159157,5.69030607 9.32159157,5.96167687 C9.32159157,6.23304767 9.54158106,6.45303716 9.81295186,6.45303716 C10.8072304,6.45484003 11.6128034,7.26041305 11.6146063,8.25469157 C11.6146063,8.52606237 11.8345958,8.74605187 12.1059666,8.74605187 C12.3773374,8.74605187 12.5973269,8.52606237 12.5973269,8.25469157 C12.5955218,6.71767203 11.3499714,5.47212165 9.81295186,5.47031657 L9.81295186,5.47031657 Z" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg></div>
    <div class="harryGIF__inner-p">If you want a classic tale, I wrote this one about how Nike sold it’s first shoes.</div>
    <a class="harryGIF__inner-button" href="/">Read Nike's story</a>
</div>
</div>`;

const box3 = `<div class="harryGIF">
<div class="harryGIF__inner">
    <div class="harryGIF__inner-logo-down"><?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 37 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="lander" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard" transform="translate(-344.000000, -17.000000)">
            <g id="Group-2" transform="translate(346.000000, 19.000000)">
                <circle id="Oval" stroke="#4742DE" stroke-width="2.5" fill="#FFFFFF" cx="16.5" cy="16.5" r="16.5"></circle>
                <g id="Idea" transform="translate(7.218750, 7.218750)" fill="#4742DE">
                    <path d="M9.86754745,2.19458128 C10.1690706,2.19458128 10.4135033,1.90126195 10.4135033,1.53943422 L10.4135033,0.66590481 C10.4135033,0.304077081 10.1690706,0.0107577514 9.86754745,0.0107577514 C9.56602434,0.0107577514 9.32159157,0.304077081 9.32159157,0.66590481 L9.32159157,1.53943422 C9.32159157,1.90126195 9.56602434,2.19458128 9.86754745,2.19458128 Z" id="Shape"></path>
                    <path d="M17.4017386,6.56222834 L16.5282092,6.56222834 C16.1663815,6.56222834 15.8730622,6.80666111 15.8730622,7.10818422 C15.8730622,7.40970733 16.1663815,7.6541401 16.5282092,7.6541401 L17.4017386,7.6541401 C17.7635664,7.6541401 18.0568857,7.40970733 18.0568857,7.10818422 C18.0568857,6.80666111 17.7635664,6.56222834 17.4017386,6.56222834 Z" id="Shape"></path>
                    <path d="M2.77012098,7.10818422 C2.77012098,6.80666111 2.47680165,6.56222834 2.11497392,6.56222834 L1.24144451,6.56222834 C0.879616779,6.56222834 0.58629745,6.80666111 0.58629745,7.10818422 C0.58629745,7.40970733 0.879616779,7.6541401 1.24144451,7.6541401 L2.11497392,7.6541401 C2.47680165,7.6541401 2.77012098,7.40970733 2.77012098,7.10818422 Z" id="Shape"></path>
                    <path d="M14.4362641,4.37840481 C14.6344894,4.37822996 14.8245322,4.29918685 14.9646114,4.15865324 L15.6723975,3.45444936 C15.9468977,3.15927331 15.938798,2.69929335 15.6540766,2.4140038 C15.3693551,2.12871425 14.9102911,2.12059844 14.6157028,2.39564635 L13.9079167,3.09985024 C13.6943644,3.31409485 13.6305262,3.63608609 13.7461358,3.91585125 C13.8617454,4.1956164 14.1340677,4.37813848 14.4362641,4.37840481 Z" id="Shape"></path>
                    <path d="M4.75161084,3.10766328 L4.03793802,2.39738167 C3.74089959,2.11995992 3.27801746,2.12814577 2.99092792,2.41589756 C2.70383837,2.70364934 2.69567135,3.1675992 2.97245464,3.46532281 L3.68612747,4.17560442 C3.98316589,4.45302617 4.44604803,4.44484032 4.73313757,4.15708854 C5.02022712,3.86933676 5.02839413,3.40538689 4.75161084,3.10766328 L4.75161084,3.10766328 Z" id="Shape"></path>
                    <path d="M16.0489674,12.2245876 C15.751929,11.9471658 15.2890469,11.9553517 15.0019573,12.2431034 C14.7148678,12.5308552 14.7067008,12.9948051 14.9834841,13.2925287 L15.6971569,14.0028103 C15.9941953,14.2802321 16.4570774,14.2720462 16.744167,13.9842944 C17.0312565,13.6965426 17.0394235,13.2325928 16.7626403,12.9348692 L16.0489674,12.2245876 Z" id="Shape"></path>
                    <path d="M2.59421571,12.2245876 L1.88054288,12.9348692 C1.60375959,13.2325928 1.6119266,13.6965426 1.89901615,13.9842944 C2.1861057,14.2720462 2.64898783,14.2802321 2.94602625,14.0028103 L3.65969908,13.2925287 C3.93648237,12.9948051 3.92831536,12.5308552 3.64122581,12.2431034 C3.35413626,11.9553517 2.89125413,11.9471658 2.59421571,12.2245876 Z" id="Shape"></path>
                    <path d="M14.781145,8.6624932 C14.7848926,6.02892083 12.8451236,3.78161497 10.2018321,3.35716216 C7.55854055,2.93270934 4.99247687,4.45648041 4.14399298,6.95440725 C3.29550908,9.45233409 4.4152221,12.1866028 6.78735734,13.4093366 C6.6657342,13.5944791 6.60076664,13.8100826 6.60018573,14.0304905 L6.60018573,15.1807757 C6.60018573,16.4513456 7.64768054,17.481346 8.93983089,17.481346 L9.71971261,17.481346 C11.0118629,17.481346 12.0593578,16.4513456 12.0593578,15.1807757 L12.0593578,14.0304905 C12.0587769,13.8100826 11.9938093,13.5944791 11.8721862,13.4093366 C13.6617578,12.4796368 14.7813552,10.6526762 14.781145,8.6624932 Z M10.8817364,14.0304905 L10.8817364,14.4139189 L8.93203207,14.4139189 C8.60899448,14.4139189 8.34712078,14.671419 8.34712078,14.9890615 C8.34712078,15.306704 8.60899448,15.5642041 8.93203207,15.5642041 L10.811547,15.5642041 C10.6467002,16.0226804 10.2064582,16.3296942 9.71191379,16.3310608 L8.93203207,16.3310608 C8.2859569,16.3310608 7.76220949,15.8160606 7.76220949,15.1807757 L7.76220949,14.0304905 L10.8817364,14.0304905 Z M9.32197293,12.8802054 L9.32197293,12.8802054 C6.95303064,12.8802054 5.03262347,10.9918713 5.03262347,8.6624932 C5.03262347,6.33311507 6.95303064,4.444781 9.32197293,4.444781 C11.6909152,4.444781 13.6113224,6.33311507 13.6113224,8.6624932 C13.6113229,9.78176468 13.1588753,10.8551378 12.3536227,11.6462225 C11.5483701,12.4373073 10.4563552,12.8812229 9.31807352,12.8802054 L9.32197293,12.8802054 Z" id="Shape"></path>
                    <path d="M9.81295186,5.47031657 C9.54158106,5.47031657 9.32159157,5.69030607 9.32159157,5.96167687 C9.32159157,6.23304767 9.54158106,6.45303716 9.81295186,6.45303716 C10.8072304,6.45484003 11.6128034,7.26041305 11.6146063,8.25469157 C11.6146063,8.52606237 11.8345958,8.74605187 12.1059666,8.74605187 C12.3773374,8.74605187 12.5973269,8.52606237 12.5973269,8.25469157 C12.5955218,6.71767203 11.3499714,5.47212165 9.81295186,5.47031657 L9.81295186,5.47031657 Z" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg></div>
<div class="harryGIF__inner-p">Or for something pratical this one about why Notion's sign up form converts so well.</div>
    <a class="harryGIF__inner-button" href="/">Read Notion's story</a>
</div>
</div>`;

export function gifLoad() {
  window.onscroll = async () => {
    if (window.gifbusy) {
      return;
    }
    if (
      Math.round(window.innerHeight + window.scrollY + 200) >=
      document.body.offsetHeight
    ) {
      window.gifbusy = true;
      try {
        let newdata;
        const { data } = await axios.get(`/api/lazyGif/${window.page}`);
        // if (window.page === 2) {
        //   newdata = box1.concat(data);
        // } else if (window.page === 3) {
        //   newdata = box2.concat(data);
        // } else if (window.page === 4) {
        //   newdata = box3.concat(data);
        // } else {
        //   newdata = data;
        // }
        $('.gif__inner-gif').insertAdjacentHTML('beforeend', newdata);
        copyGif();
        // $$('.gif__video').forEach(video => {
        //   video.addEventListener('loadeddata', resize);
        // });
        if (data.length) {
          window.page += 1;
        } else {
          return;
        }
        window.gifbusy = false;
      } catch (err) {
        console.log(err);
      }
    }
  };
}
