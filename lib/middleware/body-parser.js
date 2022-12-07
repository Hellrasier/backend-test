module.exports = async (req, res, next) => {
  if (req.method !== 'PUT' && req.method !== 'POST') {
    req.body = {}
    return next()
  }
  const buf = []
  for await (chunk of req) {
    buf.push(chunk)
  }
  try {
    req.body = JSON.parse(Buffer.concat(buf).toString())
    next()
  } catch(err) {
    res.status(400).send("Error parsing JSON")
  }
}
