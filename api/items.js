const bodyParser = require('body-parser')

module.exports = (app, todone) => {
  app.get('/api/items/getAllFromGroup', (request, response) => {
    // console.log('sending', todone.items.getAll())
    response.json({
      items: todone.items.getAllFromGroup(request.query.parent)
    })
    response.end()
  })
}