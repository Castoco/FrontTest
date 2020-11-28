'use strict';

const select = document.querySelector(`.tab-select-wrap`);
const tabs = Array.from(document.querySelectorAll(`.js-tab-content`));


const tabsFilter = () => {
  tabs.forEach((tab, index) => {
    if (index === parseInt(select.value, 10)) {
      tab.classList.add(`active`);
    } else {
      tab.classList.remove(`active`);
    }
  });
};

select.addEventListener(`change`, tabsFilter);

