# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /movies`
- `POST /movies`
- `POST /users/google-login`
- `POST /users/login`
- `POST /users/register`
- `GET /users/list`
- `GET /users/my-movies`
- `PUT /users/my-movies/:id`
- `DELETE /users/my-movies/:id`

&nbsp;

## 1. GET /movies

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "title": "string",
    "posterUrl": "string",
    "backdropUrl": "string",
    "overview": "string",
    "tmdbId": "integer"
  }
]
```

_Response (500 - Internal server error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 2. POST /movies

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "posterUrl": "string",
  "backdropUrl": "string",
  "overview": "string",
  "tmdbId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "movie has been added"
}
```

_Response (500 - Internal server error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 3. POST /users/login

Description:

- User login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Login Error)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 4. POST /users/register

Description:

- Create User

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Register Success"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Password to short"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 5. POST /users/google-login

Description:

- Google login

Request:

- body:

```json
{
  "googleToken": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 6. GET /users/list

Description:

- Get Users

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "email": "string"
  }
]
```

_Response (401 - AuthenticationError)_

```json
{
  "message": "Error authenctication"
}
```

&nbsp;

## 7. GET /users/my-movies

Description:

- Get User movies

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "posterUrl": "string",
    "backdropUrl": "string",
    "overview": "string",
    "tmdbId": "integer"
  }
]
```

_Response (401 - AuthenticationError)_

```json
{
  "message": "Error authenctication"
}
```

&nbsp;

## 8. PUT /users/my-movies/:id

Description:

- Gift movies to other users

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "UserId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Movie has been sent to other user"
}
```

_Response (401 - AuthenticationError)_

```json
{
  "message": "Error authenctication"
}
```

&nbsp;

## 9. DELETE /users/my-movies/:id

Description:

- Delete Movies from user movie list

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (401 - AuthenticationError)_

```json
{
  "message": "Error authenctication"
}
```

_Response (404 - NotFound)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (400 - Bad requests)_

```json
{
  "message": "Bad Requests"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
