const http = require('http')
const express = require('express')
const bodyParser = require('./middleware/body-parser')
const expressWinston = require('express-winston')
const { getControllers, parseKey, parseController } = require('./modules')
const validate = require('./middleware/validation') 
const handlerMiddleware = require('./middleware/request-handler')
const authMiddleware = require('./middleware/auth')
const winston = require('winston')
const { Server } = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  meta: false,
  metaField: null,
  msg: "{{req.method}} | {{req.url}} | {{res.statusCode}} | {{res.responseTime}}ms | from {{req.ip}}",
}))

app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));

app.use(bodyParser)

getControllers('./app', controllers => {
  for (endpoint in controllers) {
    Object.entries(controllers[endpoint])
      .forEach(([key, controller]) => {
        let path, method 
        try {
          [path, method] = parseKey(key)
        } catch(e) {
          throw new Error("Controller key should be request method string or pair path and method")
        }
        
        let access, params, handler
        try {
          [access, params, handler] = parseController(controller)  
        } catch {
          throw new Error("You should specify params and handler or just a handler function for controller")
        }
        
        const middleware = params 
          ? [validate(params), handlerMiddleware(handler)] 
          : [handlerMiddleware(handler)]
        
        if(access != 'public') middleware.unshift(authMiddleware.http(access))
        
        let fullPath = path ? `/api${path}` : `/api/${endpoint}`
        
        if ((method == 'get' || method == 'delete') && params) {
          const paramsUrl = Object.keys(params).map(x => '/:' + x)
          app[method](fullPath + paramsUrl, ...middleware)
        }
        app[method](fullPath, ...middleware)
        
      })
  }
  io.use(authMiddleware.ws('user'))
  io.on('connection', (conn) => console.log(conn))
  app.use((_, res) => res.status(404).send("Not found"))
})

module.exports = { server, io }
