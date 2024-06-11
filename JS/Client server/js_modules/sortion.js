import { deleteTable } from './deleteTable.js';
import { createStudentTable } from './createStudentTable.js';
import { loadStudents } from './API.js';

// переменная направления сортировки
export let sortDirection = false;

// глобальная функция клика при сортировки
function sortClick(button, sortFn, prop1, prop2, prop3) {
  button.addEventListener('click', async function() {
    // загружаем данные из сервера при каждой сортировки
    let dataStudentList = await loadStudents()
    // удаляем разметку, чтобы не дублировать уже отсортированный код
    deleteTable()
    if (!sortDirection) {
      // сортируем
      let sortedArray = sortFn(dataStudentList, prop1, prop2, prop3);
      // отрисовываем и меняем направление сортировки
      createStudentTable(sortedArray);
      button.classList.remove('btn--active');
      sortDirection = true;
      return;
    }
    let sortedArray = sortFn(dataStudentList, prop1, prop2, prop3);
    createStudentTable(sortedArray);
    button.classList.add('btn--active');
    sortDirection = false;
  })
}


// СОРТИРОВКА ПО ФАМИЛИИ
function sortOnFio(array, prop1, prop2, prop3) {
  return array.sort(function (a, b) {
    let lowfullnameA = `${a[prop2]}${a[prop1]}${a[prop3]}`.toLowerCase();
    let lowfullnameB = `${b[prop2]}${b[prop1]}${b[prop3]}`.toLowerCase();
    if (sortDirection == false) {
      if (lowfullnameA < lowfullnameB) return -1;
    } else {
      if (lowfullnameA > lowfullnameB) return -1;
    }
  })
}

// СОРТИРОВКА ПО ГОДУ ОБУЧЕНИЯ
function sortOnYearOfStudy(array, prop) {
  return array.sort((a, b) => (!sortDirection ? a[prop] > b[prop] : a[prop] < b[prop]) ? -1 : 1);
}

// СОРТИРОВКА ПО ФАКУЛЬТЕТУ
function sortOnFaculty(array, prop) {
  return array.sort((a, b) => (!sortDirection ? a[prop].toLowerCase() < b[prop].toLowerCase() : a[prop].toLowerCase() > b[prop].toLowerCase()) ? -1 : 1);
}

// Сортировка ДАТЕ РОЖДЕНИЯ
function sortOnBirthday(array, prop1) {
  return array.sort(function (a, b) {
    let birthdayA = new Date(`${a[prop1]}`);
    let birthdayB = new Date(`${b[prop1]}`);
    if (sortDirection == false) {
      if (birthdayA < birthdayB) return -1;
    } else {
      if (birthdayA > birthdayB) return -1;
    }
  })
}

// глобальная (общая) функция сортировки
export function createTableBySort() {
  // добавляем переменные заголовков таблицы студентов
  const headName = document.querySelector('.heading-name');
  const headFaculty = document.querySelector('.heading-faculty');
  const headAge = document.querySelector('.heading-age');
  const headYear = document.querySelector('.heading-year');
  // // использование глобальной функции клика при сортировки
  // сортировка по ФИО по клику
  sortClick(headName, sortOnFio, 'name', 'surname', 'lastname');

  // сортировка по году по клику
  sortClick(headYear, sortOnYearOfStudy, 'studyStart');

  // сотрировка по факультету
  sortClick(headFaculty, sortOnFaculty, 'faculty');

  // сортировка по возрасту
  sortClick(headAge, sortOnBirthday, 'birthday');
}
