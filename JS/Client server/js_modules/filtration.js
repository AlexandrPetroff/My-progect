import { deleteTable } from './deleteTable.js'
import { createStudentTable } from './createStudentTable.js'
import { loadStudents } from './API.js'


// ФИЛЬТРАЦИЯ
// функция фильтрации по факультету
function filterOnFaculty(arr, prop, value) {
  let result = [],
    copy = [...arr];
  for  (let item of copy) {
    if (String(item[prop].toLowerCase()).includes(value.toLowerCase())) {
      result.push(item);
    }
  }
  return result;
}

// функция фильтрация по ФИО
function filterOnFio(arr, prop1, prop2, prop3, value) {
  let result = [],
    copy = [...arr];
  for  (let item of copy) {
    let fio = `${item[prop2]}${item[prop1]}${item[prop3]}`.toLowerCase()
    if (String(fio).includes(value.toLowerCase())) {
      result.push(item);
    }
  }
  return result;
}

// функция фильтрации по году начала оубчения
function filterOnStartYear(arr, prop, value) {
  let result = [],
    copy = [...arr];
  for  (let item of copy) {
    if (String(item[prop]).includes(value)) {
      result.push(item);
    }
  }
  return result;
}

// функция фильтрации по году окончания обучения
function filterOnGraduationYear(arr, prop, value) {
  let result = [],
    copy = [...arr];
  for  (let item of copy) {
    if (String(+ item[prop] + 4).includes(value)) {
      result.push(item);
    }
  }
  return result;
}

// глобальная функция фильтрации
export function createTableByFilter() {
  // вводим необходимые переменные
  const filterName = document.querySelector('.filter-name');
  const filterFaculty = document.querySelector('.filter-faculty');
  const filterStartYear = document.querySelector('.filter-year');
  const filterGraduationYear = document.querySelector('.filter-graduation');
  const filterButton = document.querySelector('.filter-btn');

  // событие клика на фильтрацию
  filterButton.addEventListener('click', async function(event) {
    event.preventDefault();
    // вводим переменные значений инпутов фильтрации
    let nameValue = filterName.value;
    let facultyValue = filterFaculty.value;
    let startYearValue = filterStartYear.value;
    let graduationYearValue = filterGraduationYear.value;
    // получаем данные с сервера
    let dataStudentList = await loadStudents();
    // делаем копию массива из массива данных с сервера
    let filteredArr = [...dataStudentList];
    // вводим условия фильтрации если инпуты не пустые
    if (nameValue != '') {
      filteredArr = filterOnFio(filteredArr, 'name', 'surname', 'lastname', nameValue);
      deleteTable();
      createStudentTable(filteredArr);
    }

    if (facultyValue != '') {
      filteredArr = filterOnFaculty(filteredArr, 'faculty', facultyValue);
      deleteTable();
      createStudentTable(filteredArr);
    }


    if (startYearValue != '') {
      filteredArr = filterOnStartYear(filteredArr, 'studyStart', startYearValue);
      deleteTable();
      createStudentTable(filteredArr);
    }

    if (graduationYearValue != '') {
      filteredArr = filterOnGraduationYear(filteredArr, 'studyStart', graduationYearValue);
      deleteTable();
      createStudentTable(filteredArr);
    }

    // если инпуты очищены то выводим изначальный массив
    if (nameValue == '' && facultyValue == '' && startYearValue == '' && graduationYearValue == '') {
      createStudentTable(dataStudentList);
      return;
    }
  })
}
