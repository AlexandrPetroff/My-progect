import { createStudentTable } from './js_modules/createStudentTable.js'
import { addStudentInTable } from './js_modules/addStudentInTable.js'
import { createTableBySort } from './js_modules/sortion.js'
import { createTableByFilter } from './js_modules/filtration.js'
import { loadStudents } from './js_modules/API.js'
import { validateTextInputs } from './js_modules/validation.js'


(function(){
    document.addEventListener('DOMContentLoaded', async function() {
      // функция валидации текстовых инпутов - нельзя вводить числа,ввод только кирилицы
      validateTextInputs();
      // получение данных с сервера -  если они есть - отрисовка таблицы
      let dataStudentList = await loadStudents();
      if (dataStudentList.length > 0) createStudentTable(dataStudentList);
      // функция добавления студента в таблицу
      addStudentInTable();
      // функция отрисовки при сортировки
      createTableBySort();
      // функция отрисовки при фильтрации
      createTableByFilter();
    })
})()
