# InterNations Exercise

- Clone repository
- cd into directory and `npm install`
- `$ npm run start`
- Go to http://localhost:8080

# API

## Data Structure

```
{
  users:[array:user],
  groups:[array:group]
}

user:object {
  id: string,
  name: string
}

group:object {
  id: string,
  name: string
  members:array[userId]
}
```

## Groups

### /api/groups

- `POST` Create Group
  - request { name:required, members:optional }
  - response { id, name }
- `GET` Get all groups
  - response { array:groups }

### /api/groups/:id

- `GET` Get group
  - request { id: required }
- `PUT` Update group
  - request { id: required, name:optional, members:optional }
  - response { group }
- `DELETE` Delete group
  - request { id: required }
  
## Users

### /api/users

- `POST` Create User
  - request { name:required }
  - response { id, name }
- `GET` Get all users
  - response { array:users }

### /api/user/:id

- `GET` Get user
  - request { id: required }
- `PUT` Update user
  - request { id: required, name:optional }
  - response { user }
- `DELETE` Delete user
  - request { id: required }


# Notes

Stack:

- View layer: React
- State Management and data flow: Redux
- Client side routing: React Router
- Utility belt: lodash
- Module bundler: webpack
- ES6 - ES2015: BabelJS

