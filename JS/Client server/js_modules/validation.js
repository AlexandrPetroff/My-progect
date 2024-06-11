import { createError } from './createError.js'
import { NOW, NOW_YEAR } from './const.js'

// функция проверки на заполненость всех инпутов
export function isInputValue() {
  const inputs = document.querySelectorAll('.student-form__input')
  for (let input of inputs) {
    if (!input.value) {
      return false;
    }
  }
}

export function validateInputsForFullness() {
  // далее функции валидности
  if (isInputValue() == false) {
    createError('Не все поля заполнены');
    return false;
  } else return true;
}

export function validateInputWithBirthday(birthdayYear, birthdayDate) {
  // проверка на валидность даты рождения
  if (birthdayYear < 1900 || birthdayDate > NOW) {
    createError('Дата рождения - от 01.01.1900 до текущей даты');
    return false;
  }  else return true;
}


export function validateInputWithEducationYear(valueYear) {
  // проверка валидности на год оубчения
  if (valueYear < 2000 || valueYear > NOW_YEAR) {
    createError('Год обучения - от 2000 до текущего года');
    return false;
  } else return true;
}


export function validateTextInputs() {
  const inputsText = document.querySelectorAll('input[type = "text"]');

  inputsText.forEach(input => input.addEventListener('input', function(){
    this.value = this.value.replace(/[^а-яё\s]/gi, '');
  }))
}
