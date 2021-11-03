import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountry } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  description: document.querySelector('country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => {
    fetchCountry(e.target.value.trim())
      .then(countrys => {
        console.log(countrys.length);
        if (countrys.length > 10) {
          return Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (countrys.length > 2) {
          return renderManyCountrys(countrys);
        }
        if ((countrys.length = 1)) {
          renderCountrys(countrys);
        }
      })
      .catch(error => Notify.failure('Oops, there is no country with that name'));
  }, DEBOUNCE_DELAY),
);

function renderManyCountrys(countrys) {
  refs.list.innerHTML = '';
  const markup = countrys
    .map(({ flags, name }) => {
      return `<li class="item">
      <img src="${flags.svg}">
                  <p> ${name.official}</p></li>
               
                `;
    })
    .join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}
function renderCountrys(countrys) {
  refs.list.innerHTML = '';
  const markup1 = countrys
    .map(({ flags, name, population, capital, languages }) => {
      console.log();
      return `<li class="country">
      <div class="item">
      <img src="${flags.svg}">
              <h1> ${name.official}</h1>
              </div>
                  <p><b>Capital:</b>${capital}</p>
                     <p><b>Population:</b>${population}</p>
                  <p><b>Languages:</b>${Object.values(languages).join(', ')}</p>

                  </li>
                `;
    })
    .join('');
  refs.list.insertAdjacentHTML('beforeend', markup1);
}
