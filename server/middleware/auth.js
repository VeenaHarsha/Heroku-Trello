const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.headers['x-auth-token']
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, '' + process.env.SECRET)
    console.log('DEcoded is:', decoded)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(400).json({ msg: 'TokenV is not valid' })
  }
}
