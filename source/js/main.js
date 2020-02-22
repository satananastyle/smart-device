'use strict';
var hiddenList = document.querySelectorAll('.no-js');

hiddenList.forEach(function (element) {
  element.classList.remove('no-js');
});

var openButtons = document.querySelectorAll('.footer button');
var descriptions = document.querySelectorAll('.footer button + div');

openButtons.forEach(function (element) {
  element.addEventListener('click', openDescription);
});

function openDescription(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var content = event.target.nextElementSibling;
  var button = content.previousElementSibling;
  var display = window.getComputedStyle(content).display;

  if (display === 'none' || content.style.display === 'none') {
    descriptions.forEach(function (element) {
      element.style.display = 'none';
      element.previousElementSibling.style = '';
    });
    content.style.display = 'block';
    button.style = 'background-image: url(../img/close-button.svg)';
  } else {
    content.style.display = 'none';
    button.style = '';
  }
}
