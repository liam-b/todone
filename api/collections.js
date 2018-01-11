const bodyParser = require('body-parser')

module.exports = (app, todone, path) => {
  app.get(path + '/group/:id', (request, response) => {
    response.json({
      group: todone.collections.get(request.params.id)
    })
    response.end()
  })

  app.get(path + '/workspace/:id', (request, response) => {
    response.json({
      workspace: todone.collections.get(request.params.id)
    })
    response.end()
  })

  app.get(path + '/groups', (request, response) => {
    response.json({
      groups: todone.collections.getAll('group')
    })
    response.end()
  })

  app.get(path + '/workspaces', (request, response) => {
    response.json({
      workspaces: todone.collections.getAll('workspace')
    })
    response.end()
  })

  app.get(path + '/groups/parent/:id', (request, response) => {
    response.json({
      groups: todone.collections.getAllFromParent(request.params.id)
    })
    response.end()
  })
}