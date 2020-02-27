'use strict';

// аккордеон футер
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

// валидация

window.iMaskJS(document.querySelector('.feedback input[type="tel"]'), {mask: '+{7}(000)000-00-00'});
window.iMaskJS(document.querySelector('.modal input[type="tel"]'), {mask: '+{7}(000)000-00-00'});

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
  var visuallyCheckbox = currentForm.querySelector('input[type="checkbox"] + label span');


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
      visuallyCheckbox.style = 'border: 1px solid red';
    } else {
      visuallyCheckbox.style = '';
    }
  }

  if (errorPhone) {
    currentInput.style = 'border: 1px solid red';
    currentInput.setCustomValidity(errorPhone);
  } else {
    currentInput.style = '';
  }

  if (errorPhone || errorName || !currentCheckbox.checked) {
    return 'Не все поля заполненны корректно';
  }
  currentForm.reset();
  return '';
}

// модальное окно

var questionButton = document.querySelector('.feedback button');
var inputs = document.querySelectorAll('input');
var checkboxes = document.querySelectorAll('input[type = "checkbox"] + label span');


if (questionButton) {
  questionButton.addEventListener('click', getResultValidation);
}

if (inputs && checkboxes) {
  document.addEventListener('click', clearForm);
}

function clearForm() {
  Array.prototype.forEach.call(inputs, function (element) {
    element.style = '';
  });

  Array.prototype.forEach.call(checkboxes, function (element) {
    element.style = '';
  });
}

var ESC_CODE = 27;

var body = document.querySelector('body');

var overlay = document.querySelector('.overlay');

var callMeButton = document.querySelector('.header__nav .button');
var modalCallMe = document.querySelector('.modal');
var closeCallMe = modalCallMe.querySelector('button[type="button"]');
var orderButton = modalCallMe.querySelector('button[type="submit"]');
var form = modalCallMe.querySelector('form');

if (callMeButton) {
  callMeButton.addEventListener('click', onCallMeButton);
}

function closeModal() {
  form.reset();

  if (!modalCallMe.classList.contains('vissualy-hidden')) {
    modalCallMe.classList.add('visually-hidden');
    closeCallMe.removeEventListener('click', onCloseButton);
    orderButton.removeEventListener('click', onOrderButton);
  }

  closeCallMe.removeEventListener('click', onCloseButton);
  orderButton.removeEventListener('click', onOrderButton);

  overlay.classList.add('visually-hidden');
  body.style = 'overflow: auto';

  overlay.removeEventListener('click', onCloseButton);
  document.removeEventListener('keydown', onModalEscPress);

  clearForm();
}

function openModal() {
  overlay.classList.remove('visually-hidden');
  body.style = 'position: fixed; overflow-y: scroll';

  overlay.addEventListener('click', onCloseButton);
  document.addEventListener('keydown', onModalEscPress);
}

function onCallMeButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  modalCallMe.classList.remove('visually-hidden');
  closeCallMe.addEventListener('click', onCloseButton);
  orderButton.addEventListener('click', onOrderButton);

  openModal();
}

function onCloseButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  closeModal();
}

function onOrderButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  if (getResultValidation(evt) !== '') {
    return;
  }

  closeModal();
}

function onModalEscPress(evt) {
  if (evt.keyCode === ESC_CODE) {
    closeModal();
  }
}
