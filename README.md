﻿# Работа с БД

В данном проекте имеется тестовая версия сервера.
Запуск сервера осуществляется командой npm run start.
Запуск сервера c хот релоудом осуществляется командой npm run dev.
Сервер будет обращаться к базе данных по адресу: mongodb://localhost:27017/mestodb
Перед началом работы необходимо передать секретный код для токена в переменную окружения - JWT_SECRET
Код был размещен на виртуальной машине Яндекс.Облако и имеет публичный ip - 130.193.38.84
Также для кода были приобретены и настроены бесплатные домены:

24sere.ga
www.24sere.ga

Результаты всех запросов записываются в: logs/request.log
Ошибки, вызванные в запросах будут записываться в: logs/error.log
Регистрация пользователя проходит по адресу: http://localhost:3000//signup
Далее пользователю необходимо получить токен для авторизациия на сайте, для этого ему необходимо отправить post-запрос на адрес: http://localhost:3000/signin, и указать свой логин и пароль в теле 

После сервер выдаст ваш персональный токен, необходимый для дальнейшей авторизации и работе на сервере(его необходимо будет отправлять в заголовках запроса ключа authorization)
Когда вы авторизировались, то можете получить доступ к следующим действиям:

Массив с карточками можно получить по адресу: http://localhost:3000/cards
Массив с пользователями можно получить по адресу: http://localhost:3000/users
Конкретного пользователя по id можно получить по адресу: http://localhost:3000/users/(id пользователя)
Удалить карточку по id можно получить по адресу(тип запроса - delete): http://localhost:3000/users/(id пользователя), но вы можете удалить лишь ту карточку, владельцем которой являетесь именно вы
Создать пользователя можно по адресу(тип запроса - post): http://localhost:3000/users(необходимо учитывать валидацию при создании пользователя)
Создать карточку можно по адресу(тип запроса - post): http://localhost:3000/cards(необходимо учитывать валидацию при создании карточки)
