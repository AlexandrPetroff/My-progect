import { createStudentItem } from './createStudentItem.js'

// функция создания таблицы студентов из массива в качестве параметра
export function createStudentTable(array) {
  for (const obj of array) {
    createStudentItem(obj);
  }
}
