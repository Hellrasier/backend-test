const CreateUserParams = {
  login: 'string',
  password: 'string',
  firstname: 'string',
  surname: 'string',
  role: 'string',
  department: 'string',
  position: '?string'
}

const UpdateUserParams = {
  id: 'number',
  login: '?string',
  password: '?string',
  firstname: '?string',
  surname: '?string',
  department: '?string',
  position: '?string'
}

const GetUserParams = {
  id: '?number',
  from: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }, 
  to: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }
}

module.exports = { CreateUserParams, UpdateUserParams, GetUserParams }
