const bodyParser = require('body-parser')

module.exports = (app, todone) => {
  app.get('/api/collections/get', (request, response) => {
    response.json({
      collection: todone.collections.get(request.body.id)
    })
    response.end()
  })

  app.get('/api/collections/getAll', (request, response) => {
    response.json({
      collections: todone.collections.getAll(request.query.type)
    })
    response.end()
  })

  app.get('/api/collections/getAllFromParent', (request, response) => {
    response.json({
      collections: todone.collections.getAllFromParent(request.query.parent)
    })
    response.end()
  })
}