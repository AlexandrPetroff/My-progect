import { deleteErrors } from './deleteErrors.js';
import { validateInputsForFullness, validateInputWithBirthday, validateInputWithEducationYear } from './validation.js'
import { createStudentInServer } from './API.js'


export async function addStudentInTable() {
  const addButton = document.querySelector('.add-btn');
  const studentFormInputs = document.querySelectorAll('.student-form__input');
  const inputName = document.querySelector('.input-name');
  const inputSurname = document.querySelector('.input-surname');
  const inputLastname = document.querySelector('.input-lastname');
  const inputBirthday = document.querySelector('.input-birthday');
  const inputEducationYear = document.querySelector('.input-year');
  const inputFaculty = document.querySelector('.input-faculty');
  // событие клика на кнопку добавить студента
  addButton.addEventListener('click', async function(e) {
    e.preventDefault();
    // удаление ошибок если есть
    deleteErrors();
    // задаем переменные значений инпутов
    let studentName = inputName.value;
    let studentSurname = inputSurname.value;
    let studentLastname = inputLastname.value;
    let studentBirthday = inputBirthday.value;
    let birthdayDate = new Date(studentBirthday);
    let birthdayYear = birthdayDate.getFullYear();
    let educationYear = inputEducationYear.value;
    let faculty = inputFaculty.value;
    // //  функции валидности
    // если валидация не прошла - return, данные на сервер не отправляются
    if (!validateInputsForFullness() || !validateInputWithBirthday(birthdayYear, birthdayDate) || !validateInputWithEducationYear(educationYear)) return;
    // РАБОТА С СЕРВЕРОМ
    // ПОСТ данных на сервер
    await createStudentInServer(studentName, studentSurname, studentLastname, studentBirthday, educationYear, faculty);
    // обнуляем поля ввода после добавления
    studentFormInputs.forEach(input => input.value = '');
  })
}
