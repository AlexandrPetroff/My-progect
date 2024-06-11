import { STUDENT_TABLE, NOW_YEAR, NOW_MONTH, NOW } from './const.js'
import { deleteStudentInServer } from './API.js'

// функция создания DOM-элемента 1 студента, в качестве параметра обьект студента
export function createStudentItem(studentObject) {
  // элементы
  const tableString = document.createElement('div');
  const cell1 = document.createElement('div');
  const cell2 = document.createElement('div');
  const cell3 = document.createElement('div');
  const cell4 = document.createElement('div');
  const cell5 = document.createElement('div');
  const deleteButton = document.createElement('button');
  // добавление классов
  tableString.classList.add('string-table');
  cell1.classList.add('cell-table');
  cell2.classList.add('cell-table');
  cell3.classList.add('cell-table');
  cell4.classList.add('cell-table');
  cell5.classList.add('cell-table');
  deleteButton .classList.add('delete-btn');
  // добавление контента
  cell1.textContent = studentObject.surname + ' ' + studentObject.name + ' ' + studentObject.lastname;
  cell2.textContent = studentObject.faculty;
  let graduationYear = + studentObject.studyStart + 4;
  // создание обьекта даты рождения студента и получение из него значений: год, месяц и сама дата
  let birthDate = new Date(studentObject.birthday);
  let birthYear = birthDate.getFullYear();
  let birthMonth = birthDate.getMonth() + 1;
  let birthDay = birthDate.getDate();
  // коррекция номера месяца если он меньше 10
  if (birthMonth < 10) {
    birthMonth = '0' + birthMonth;
  }
  // коррекция номера дня если он меньше 10
  if (birthDay < 10) {
    birthDay = '0' + birthDay;
  }
  cell3.textContent = birthDay + '.' + birthMonth + '.' + birthYear + ' ' + `(${NOW.getFullYear() - birthYear} лет)`;
  // контент раздела "годы обучения" в завсимости от года выпуска
  if (graduationYear < NOW_YEAR || (graduationYear == NOW_YEAR &&  NOW_MONTH >= 9)) {
      cell4.textContent = studentObject.studyStart + '-' + `${graduationYear}` + ' ' + '(закончил)';
  }
  else {
      cell4.textContent = studentObject.studyStart + '-' + `${graduationYear}` + ' ' + `(${NOW_YEAR - studentObject.studyStart} курс)`;
  }
  deleteButton.textContent = 'x';
  // добавление в разметку
  tableString.append(cell1);
  tableString.append(cell2);
  tableString.append(cell3);
  tableString.append(cell4);
  cell5.append(deleteButton);
  tableString.append(cell5);
  STUDENT_TABLE.append(tableString);
  // событие клика на кнопку "удалить студента"
  deleteButton.addEventListener('click', async function() {
    await deleteStudentInServer(studentObject);
    tableString.remove();
  })
}
