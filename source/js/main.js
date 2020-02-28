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

function getResultValidation(evt, currentForm) {
  evt.preventDefault();
  evt.stopPropagation();

  var currentInput = currentForm.querySelector('input[type="tel"]');
  var currentName = currentForm.querySelector('input[type="text"]');
  var currentCheckbox = currentForm.querySelector('input[type="checkbox"]');
  var currentLetter = currentForm.querySelector('textarea');
  var visuallyCheckbox = currentForm.querySelector('input[type="checkbox"] + label span');

  var errorPhone = getPhoneError(currentInput.value);

  if (currentName) {
    var errorName = getNameError(currentName.value);
    if (errorName !== '') {
      currentName.style = 'border-color: red';
    } else {
      currentName.removeAttribute('style');
    }
  }

  if (currentLetter) {
    var errorLetter = getNameError(currentLetter.value);
    if (errorLetter !== '') {
      currentLetter.style = 'border-color: red';
    } else {
      currentLetter.removeAttribute('style');
    }
  }

  if (errorPhone) {
    currentInput.style = 'border-color: red';
  } else {
    currentInput.removeAttribute('style');
  }

  if (currentCheckbox) {
    if (!currentCheckbox.checked) {
      visuallyCheckbox.style = 'border-color: red';
    } else {
      visuallyCheckbox.removeAttribute('style');
    }
  }

  if (errorPhone || errorName || !currentCheckbox.checked || errorLetter) {
    return 'Не все поля заполненны корректно';
  }

  localStorage.setItem('user', currentName.value);
  // localStorage.setItem('phone', currentInput.value);
  localStorage.setItem('letter', currentLetter.value);

  currentForm.reset();
  return '';
}

// формы

var questionButton = document.querySelector('.feedback button');
var inputs = document.querySelectorAll('input');
var checkboxes = document.querySelectorAll('input[type = "checkbox"] + label span');
var letters = document.querySelectorAll('textarea');


if (questionButton) {
  questionButton.addEventListener('click', function (evt) {
    getResultValidation(evt, feedbackForm);

  });
}

// модальное окно
var ESC_CODE = 27;

var body = document.querySelector('body');

var callMeButton = document.querySelector('.header__nav .button');
var modalCallMe = document.querySelector('.modal');
var modalName = modalCallMe.querySelector('input[name="user"]');
var modalPhone = modalCallMe.querySelector('input[type="tel"]');
var modalLetter = modalCallMe.querySelector('textarea');
var closeCallMe = modalCallMe.querySelector('button[type="button"]');
var orderButton = modalCallMe.querySelector('button[type="submit"]');
var form = modalCallMe.querySelector('form');
var feedbackForm = document.querySelector('.feedback form');

if (callMeButton) {
  callMeButton.addEventListener('click', onCallMeButton);
}

function openModal() {
  modalCallMe.classList.remove('modal--hidden');

  body.style = 'position: fixed; overflow: hidden';

  modalCallMe.addEventListener('click', onOverlay);
  document.addEventListener('keydown', onModalEscPress);

  if (localStorage.getItem('user') && localStorage.getItem('phone') && localStorage.getItem('letter')) {
    modalName.value = localStorage.getItem('user');
    modalLetter.value = localStorage.getItem('letter');
    modalPhone.value = localStorage.getItem('phone');

    orderButton.focus();
  } else {
    modalName.focus();
  }
}

function onOverlay(evt) {
  if (evt.target === modalCallMe) {
    closeModal();
  }
}

function closeModal() {
  form.reset();
  clearForm();

  if (!modalCallMe.classList.contains('modal--hidden')) {
    modalCallMe.classList.add('modal--hidden');
    closeCallMe.removeEventListener('click', onCloseButton);
    orderButton.removeEventListener('click', onOrderButton);
  }

  closeCallMe.removeEventListener('click', onCloseButton);
  orderButton.removeEventListener('click', onOrderButton);

  modalCallMe.classList.add('modal--hidden');
  body.removeAttribute('style');

  modalCallMe.removeEventListener('click', onOverlay);
  document.removeEventListener('keydown', onModalEscPress);
}

function onCallMeButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  modalCallMe.classList.remove('modal--hidden');
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

  if (getResultValidation(evt, form) !== '') {
    return;
  }

  closeModal();
}

function onModalEscPress(evt) {
  if (evt.keyCode === ESC_CODE) {
    closeModal();
  }
}

function clearForm() {
  Array.prototype.forEach.call(inputs, function (element) {
    element.removeAttribute('style');
  });

  Array.prototype.forEach.call(checkboxes, function (element) {
    element.removeAttribute('style');
  });

  Array.prototype.forEach.call(letters, function (element) {
    element.removeAttribute('style');
  });
}

Array.prototype.forEach.call(inputs, function (element) {
  element.oninput = function () {
    element.removeAttribute('style');
  };
});

Array.prototype.forEach.call(checkboxes, function (element) {
  element.onclick = function () {
    element.removeAttribute('style');
  };
});

Array.prototype.forEach.call(letters, function (element) {
  element.oninput = function () {
    element.removeAttribute('style');
  };
});

window.iMaskJS(document.querySelector('.feedback input[type="tel"]'), {mask: '+{7}(000)000-00-00'});
window.iMaskJS(document.querySelector('.modal input[type="tel"]'), {mask: '+{7}(000)000-00-00'});
