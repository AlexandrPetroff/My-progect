// функция удаления таблицы
export function deleteTable() {
  const allTableStrings = document.querySelectorAll('.string-table');
  allTableStrings.forEach(string => string.remove());
}
