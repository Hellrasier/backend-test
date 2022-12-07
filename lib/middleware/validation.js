const { Schema } = require('metaschema')

module.exports = (parameters) => (req, res, next) => {
  
  for (param in req.query) {
    const tryNumber = +req.query[param]
    if (!isNaN(tryNumber)) req.query[param] = tryNumber  
  }

  const args = Object.keys(req.body).length > 0 ? req.body : req.query
  
  const { valid, errors } = new Schema('', parameters).check(args) 
  if (!valid) {
    res.status(400).send({ errors })
  } else {
    next()
  }
}
