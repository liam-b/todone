const bodyParser = require('body-parser')

module.exports = (app, todone, path) => {
  app.get(path + '/todos/parent/:id', (request, response) => {
    response.json({
      todos: todone.items.getAllFromGroup(request.params.id)
    })
    response.end()
  })

  app.post(path + '/todos', (request, response) => {
    // todone.items.add(request.body.content, request.body.parent, 'todo')
    console.log(request.body)
    response.end()
  })
}