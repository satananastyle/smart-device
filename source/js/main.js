'use strict';
var hiddenList = document.querySelectorAll('.no-js');

if (hiddenList) {
  Array.prototype.forEach.call(hiddenList, function (element) {
    element.classList.remove('no-js');
  });
}

var openButtons = document.querySelectorAll('.footer button');
var descriptions = document.querySelectorAll('.footer button + div');

if (openButtons && descriptions) {
  Array.prototype.forEach.call(openButtons, function (element) {
    element.addEventListener('click', openDescription);
  });
}

function openDescription(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var content = event.target.nextElementSibling;
  var button = content.previousElementSibling;

  if (!content.classList.contains('footer__close')) {
    Array.prototype.forEach.call(descriptions, function (element) {
      element.classList.remove('footer__close');
      element.previousElementSibling.classList.remove('footer__button-close');
    });
    content.classList.add('footer__close');
    button.classList.add('footer__button-close');
  } else {
    content.classList.remove('footer__close');
    button.classList.remove('footer__button-close');
  }
}
