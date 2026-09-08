Обрабатывает различные запросы по конкретным путям.
## Запросы на получение (GET)
#### /users
Возвращает список всех добавленных пользователей.
```
[
	{
	    id: number,
	    name: string,
	    email: string,
	    number: number,
	    role_name: string
	}, ...
]
```
#### /unusers
Возвращает список всех пользователей, которые хотят присоединиться.
#### /me
Возвращает данные пользователя.
#### /user/{id}/spec
Возвращает список id специальностей конкретного пользователя.
#### /spec
Возвращает все допустимые специальности по группам.
```
{
	id: number,
	name: string,
	spec: [
		{
			id: number,
			name: string
		}
	]
}
```
#### /events
Возвращает список все событий.
```
[
	{
	    id: number,
	    name: string,
	    date: string,
	    numbers: number,
	    isPart: boolean,
	    isYour: boolean,
	    author: number
	}, ...
]
```
#### /event/${id}/users
Возвращает список пользователей конкретного события.
#### /events/{id}/pages
Возвращает объект со всеми страницами конкретного события.
```
{
    id_event: number,
    pages: [
	    {
		    id: number,
		    name: string,
		    description: string
		}
    ]
}
```
#### /events/{id}/comments
Возвращает объект со всеми комментариями конкретного события.
```
{
    id_event: number,
    comments: [
	    {
		    id: number,
		    author: number,
		    content: string,
		    created_time: string,
		    updated_time: string,
		}
    ]
}
```
## Запросы на изменение (POST)

#### /auth/refresh
Обновляет токен
```
{
	refreshToken: refreshToken
}
```
#### /logup
Регистрирует пользователя по данным.
```
{
    name: string,
    email: string,
    password: string
}
```
#### /login
Осуществляет вход по данным.
```
{
    email: string,
    password: string
}
```
#### /me/update
Изменяет текущего пользователя, принимает объект со всеми и измененными данными пользователя.
#### /me/update/spec
Обновляет специальности. Принимает массив id специальностей.
#### /user/role
Изменение роли у пользователя
```
{
	id: number,
	role: Roles
}
```
#### /event/create
Создание события
```
{
    name: string,
    date: string,
}
```
#### '/event/update'
Изменение события
#### /event/${id}/page/update
Изменение страницы у события
```
{
    id: number,
    name: string,
    description: string
}
```
#### /event/users/delete
Удаление пользователя из события
```
{
	id_event: number,
	id_user: number
}
```
#### /event/users/add
Добавление пользователя
#### /event/comment
Отправка комментария
```
{
	id_event: number,
	comment: string
}
```
## Запросы на удаление (DELETE)
#### /user/${id}
Удаление пользователя по id.