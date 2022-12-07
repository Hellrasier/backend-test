# Express server API with users (crud) and topics (crud)

## Authorization

### Description
Endpoints for authorization. 
Login creates access token (15m expiration time) and refresh token (1d expiration time)
Refresh endpoint creates new pair refresh token and access token invalidating old refresh token
Logout invalidates a refresh token

### `POST`:  /api/login
#### request body:
  
  ```
  {
      login: [string].
      password: [sting]
  }
```
#### returns:
```
{
    access_token: [string],
    refresh_token: [string]
}
```

### `POST`:  /api/refresh
#### request body:
  
  ```
  {
      token: [refresh_token].
  }
```
#### returns:
```
{
    access_token: [string],
    refresh_token: [string]
}
```

### `POST`:  /api/logout
#### request body:
  
  ```
  {
      token: [refresh_token].
  }
```
#### returns:
```
"Logged out"
```
## Crud users

### `GET`: /api/users
### `GET`: /api/users?id=[number]
### `GET`: /api/users?from=[datetime]&to=[datetime]
#### returns:
```
{
    login: [string],
    firstname: [string],
    surname: [string],
    role: [user, admin]
    department:  [IT, office, administration],
    position: [string],
    created_at:  [datetime]
}
```

### `POST`: /api/users
#### request body:
```
{
    login: [string],
    firstname: [string],
    surname: [string],
    role: [user, admin]
    department:  [IT, office, administration],
    position: [string],
}
```
#### returns 
```
{
    id: [number]
}
```

### `PUT`: /api/users
#### request body:
```
{
    id: [string]
    login?: [string],
    firstname?: [string],
    password?: [string],
    surname?: [string],
    department?:  [IT, office, administration],
    position?: [string],
}
```
#### returns:
```
ok
```

### `DELETE`: /api/users?id=[number]
#### returns:
```
ok
```

## Crud topics

### `GET`: /api/topics
### `GET`: /api/topics?id=[number]
### `GET`: /api/topics?from=[datetime]&to=[datetime]
#### returns:
```
{
    name: [string],
    contents: [string],
    author: [User],
    created_at:  [datetime]
}
```

### `POST`: /api/topics
#### request body:
```
{
      name: [string],
      contents: [string],
      author: [user_id]

}
```
#### returns 
```
{
    id: [number]
}
```

### `PUT`: /api/topics
#### request body:
```
{
    id: [number],
    name?: [string],
    contents?: [string]
    author?: [number]

}
```
#### returns:
```
ok
```

### `DELETE`: /api/topics?id=[number]
#### returns:
```
ok
```

## Websocket

### Event `topic`
#### returns: 
```
{
    name: [string],
    contents: [string],
    author: [User],
    created_at:  [datetime]
}
```
