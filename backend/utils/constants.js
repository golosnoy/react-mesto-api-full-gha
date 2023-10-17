const urlPattern = /https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}/;

const crashMessage = 'Сервер сейчас упадёт';
const authorizedMessage = 'Авторизация прошла успешно';
const validationErrorMessage = 'Передан некорректный ID';
const notFoundErrorMessage = 'Карточка с таким ID не найдена';
const accessErrorMessage = 'У вас нет прав для удаления карточки';
const duplicateErrorMessage = 'Пользователь с таким email уже существует';
const userNotFoundErrorMessage = 'Пользователь не найден';
const unauthorizedErrorMessage = 'Необходима авторизация';
const loginErrorMessage = 'Неправильные почта или пароль';
const notValidURLMessage = '{VALUE} is not a valid URL';
const notValidEmailMessage = '{VALUE} is not a valid email';
const idNotFoundErrorMessage = 'Id не найден';
const pageNotFoundErrorMessage = 'Страница не найдена';
const serverErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  urlPattern,
  crashMessage,
  authorizedMessage,
  validationErrorMessage,
  notFoundErrorMessage,
  accessErrorMessage,
  duplicateErrorMessage,
  userNotFoundErrorMessage,
  idNotFoundErrorMessage,
  unauthorizedErrorMessage,
  loginErrorMessage,
  notValidURLMessage,
  pageNotFoundErrorMessage,
  notValidEmailMessage,
  serverErrorMessage,
};
