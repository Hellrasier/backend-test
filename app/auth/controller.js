const HttpError = require('http-errors')

module.exports = (authService) => ({
  [['/login', 'post']]: {
    access: 'public',
    params: {
      login: 'string',
      password: 'string',
    },
    handler: async ({ login, password }) => {
      const tokens = await authService.validate(login, password)

      if (!tokens) {
        throw new HttpError(400, "Invalid login or password")
      }

      return tokens
    }
  },

  
  [['/refresh', 'post']]: {
    access: 'user',
    params: { token: 'string' },
    handler: async ({ token }, ctx) => {
      const res = await authService.refresh(token, ctx)
      if(!res) throw HttpError(401, 'Unauthorized')
      else return res
    }
  },

  
  [['/logout', 'post']]: {
    access: 'user',
    params: { token: 'string' },
    handler: async ({ token }, ctx) => {
      const res = await authService.deleteSession(token, ctx)
      if(!res) throw HttpError(401, 'Unauthorized')
      else return "Logged out"
    }
  }
})
