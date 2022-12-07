const { CreateUserParams, UpdateUserParams, GetUserParams } = require('./dto')
const HttpError = require('http-errors')

module.exports = (usersService) => ({
  'get': {
    params: GetUserParams,
    handler: ({ id, from, to }) => {
      if(id) {
        return usersService.findUser(id) 
      }
      return usersService.getAllUsers({from, to})
    }
  },
  
  'post': {
    params: CreateUserParams,
    handler: async (createUserParams) => {
      const res = await usersService.createUser(createUserParams)
      if (res) {
        return res
      } else {
        throw new HttpError(400, "User with this login already exist")
      }
    }
  },
  
  'put': {
    params: UpdateUserParams,
    handler: async (updateUserParams) => {
      const res = await usersService.updateUser(updateUserParams)
      if (res) {
        return "ok"
      } else {
        throw new HttpError(400, "This user does not exist")
      }
    }

  },

  'delete': {
    params: { id: 'number' },
    handler: ({ id }) => {
      return usersService.deleteUser(id)
    }
  }
})
