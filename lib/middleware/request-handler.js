const nonBodyReq = (req) => req.method == 'GET' || req.method == 'DELETE'
const logger = require('../logger')

module.exports = (handler) => async (req, res) => {
  try {
    const args = nonBodyReq(req) ? req.query : req.body
    const result = await handler(args, req.ctx)
    res.status(200).json(result)
  } catch(err) {
    if (!err.status) {
      logger.error(err.stack)
      res.status(500).send("Internal server error")
    }
    res.status(err.status).send(err.message)
  }
}
