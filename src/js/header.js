'use strict';
const header = document.querySelector(`.header`);
const headerLogo = header.querySelector(`.header-logo`);
const minYOffser = 10;

const setHeight = function () {
  if (pageYOffset > minYOffser) {
    header.classList.add(`header--fixed`);
    headerLogo.classList.add(`header-logo--fixed`);
  }
  if (pageYOffset < minYOffser) {
    header.classList.remove(`header--fixed`);
    headerLogo.classList.remove(`header-logo--fixed`);
  }
};

window.addEventListener(`scroll`, setHeight);
