const CreateUserParams = {
  login: 'string',
  password: { type: 'string', length: { min: 10 }},
  firstname: 'string',
  surname: 'string',
  role: { enum: ['admin', 'user'] },
  department: { enum: ['IT', 'office', 'administration'] },
  position: '?string'
}

const UpdateUserParams = {
  id: 'number',
  login: '?string',
  password: '?string',
  firstname: '?string',
  surname: '?string',
  department: { enum: ['IT', 'office', 'administration'] },
  position: '?string'
}

const GetUserParams = {
  id: '?number',
  from: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }, 
  to: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }
}

module.exports = { CreateUserParams, UpdateUserParams, GetUserParams }
