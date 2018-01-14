const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const Todone = require('./todone/main.js')
const request = require('request')

const api = {
  'items': require('./api/items.js'),
  'collections': require('./api/collections.js')
}

const app = express()
var todone = new Todone('./db.json')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

function indentOnParent (collection, indent) {
  if (collection.parent != '') return indentOnParent(todone.collections.get(collection.parent), indent + 1)
  else return indent
}

app.get('/app', (request, response) => {
  let workspace = todone.collections.getAll('workspace')[0].id
  // let group = todone.collections.getAllFromParent(workspace)[0].id

  response.redirect('/app/workspace/' + workspace + '/group/' + workspace)
})

app.get('/app/*', (request, response) => {
  response.render('layout')
})

app.listen(3000, () => {
  console.info('started on port 3000')
})

app.post('/web/items/updateOrders', (request, response) => {
  let idList = request.body['idList[]']
  if (typeof idList != 'string') todone.items.updateOrders(idList)
  response.end()
})

app.post('/test', (request, response) => {
  console.log(request.body)
})

app.get('/collection', (request, response) => {
  response.render('layout', {
    'todone': todone,
    'indentOnParent': indentOnParent,

    'request': {
      'collection': request.query.id
    }
  })
})

api.items(app, todone, '/api/items')
api.collections(app, todone, '/api/collections')