'use strict';

const imageHandle = document.querySelector(`.tab-moving`);

imageHandle.addEventListener(`mousedown`, function (evt) {
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

    imageHandle.style.top = (imageHandle.offsetTop - shift.y) + `px`;
    imageHandle.style.left = (imageHandle.offsetLeft - shift.x) + `px`;

  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);

});

