// функция создания блока с сообщением ошибки
export function createError(messageError) {
  const wrapperButton = document.querySelector('.wrapper-button');
  const errorBlock = document.createElement('div');
  errorBlock.textContent = messageError;
  errorBlock.classList.add('error');
  wrapperButton.prepend(errorBlock);
}
