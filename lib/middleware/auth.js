const jwt = require('jsonwebtoken')

module.exports = {
  http: (access) => (req, res, next) => {
    try {
      const token = req.headers['authorization'].split(' ')[1]
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          res.status(401).send("Authorization token expired")
          return
        }
        
        if (payload.role == 'user' && access != 'user') {
          res.status(403).send("You have no permission for this action")
          return
        }
        
        req.ctx = payload
        next()
      })

    } catch(e) {
      res.status(401).send("Authorization failed")
    }
  },

  ws: (access) => (socket, next) => {
    try {
      const token = socket.request.headers['authorization'].split(' ')[1]
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          next(new Error("Authorization failed"))
          return
        }
        
        if (payload.role == 'user' && access != 'user') {
          next(new Error("You haven't permission for this action"))
        }
        
        next()
      })

    } catch(e) {
      next(new Error("Authorization failed"))
    }
  }
}
