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

window.iMaskJS(document.querySelector('.feedback input[type="tel"]'), {mask: '+{7}(000)000-00-00'});

var questionButton = document.querySelector('.feedback button');

questionButton.addEventListener('click', getResultValidation);

var MAX_LENGTH = 16;

function getPhoneError(phone) {
  if (phone.length < MAX_LENGTH) {
    return 'Укажите ваш телефон';
  }

  if (phone.substring(0, 2) !== '+7') {
    return 'Укажите ваш телефон';
  }
  return '';
}

function getNameError(name) {
  if (name === '') {
    return 'Укажите ваше имя';
  }
  return '';
}

function getResultValidation(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var currentForm = evt.currentTarget.closest('form');
  var currentInput = currentForm.querySelector('input[type="tel"]');
  var currentName = currentForm.querySelector('input[type="text"]');
  var currentCheckbox = currentForm.querySelector('input[type="checkbox"]');


  var errorPhone = getPhoneError(currentInput.value);

  if (currentName) {
    var errorName = getNameError(currentName.value);
    if (errorName !== '') {
      currentName.style = 'border: 1px solid red';
      currentName.setCustomValidity(errorName);
    } else {
      currentName.style = '';
    }
  }

  if (currentCheckbox) {
    if (!currentCheckbox.checked) {
      currentCheckbox.nextElementSibling.style = 'border: 1px solid red';
    } else {
      currentCheckbox.nextElementSibling.style = '';
    }
  }

  if (errorPhone) {
    currentInput.style = 'border: 1px solid red';
    currentInput.setCustomValidity(errorPhone);
  } else {
    currentInput.style = '';
  }

  if (errorPhone || errorName || !currentCheckbox.checked) {
    return;
  }
  currentForm.reset();
}

var inputs = document.querySelectorAll('input');
var checkboxes = document.querySelectorAll('input[type = "checkbox"] + span');

if (inputs && checkboxes) {
  document.addEventListener('click', clearForm);
}

function clearForm(evt) {
  evt.stopPropagation();

  Array.prototype.forEach.call(inputs, function (element) {
    element.style = '';
  });

  Array.prototype.forEach.call(checkboxes, function (element) {
    element.style = '';
  });
}
