const path = require('path')
// const db = require(`${path.dirname(__filename)}/../db.json`) // bad, it will not update
const fs = require('fs')

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId

    // Fixing the middleware, we always need a fresh db (for new conversations)
    const freshDB = JSON.parse(fs.readFileSync(`${path.dirname(__filename)}/../db.json`, 'utf8'));

    const result = freshDB?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    res.status(200).json(result)
    return
  }

  next()
}