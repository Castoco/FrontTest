'use strict';

const imageScale = document.querySelector(`.tab-photo-wraper`);
const cat = document.querySelector(`.tab-scale`);

imageScale.addEventListener(`mouseover`, function (evt) {
  evt.preventDefault();

  let startCords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const shift = {
      x: startCords.x - moveEvt.clientX,
      y: startCords.y - moveEvt.clientY
    };

    startCords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    cat.style.top = (cat.offsetTop + shift.y) + `px`;
    cat.style.left = (cat.offsetLeft + shift.x) + `px`;

  };

  const onMouseOut = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseout`, onMouseOut);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseout`, onMouseOut);

});

