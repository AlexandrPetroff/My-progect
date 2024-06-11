// функция удаления ошибок
export  function deleteErrors() {
  const errors = document.querySelectorAll('.error');
  errors.forEach(error => error.remove());
}
