const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const Todone = require('./todone/main.js')

const app = express()
var todone = new Todone('./db.json')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

function indentOnParent (collection, indent) {
  if (collection.parent != '') return indentOnParent(todone.collections.get(collection.parent), indent + 1)
  else return indent
}

app.get('/', (request, response) => {
  // console.log('sending', todone.items.getAllFromGroup('0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d'))
  response.render('layout', {
    todone: todone,
    'indentOnParent': indentOnParent
  })
})

app.listen(3000, () => {
  console.info('started on port 3000')
})

app.post('/web/items/updateOrders', (request, response) => {
  todone.items.updateOrders(request.body['idList[]'])
  response.end()
})

app.post('/test', (request, response) => {
  console.log(request.body.content)
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

// todone.items.remove('fcd9cbba-3a44-48ba-8574-f4fe48e35c33')
// todone.items.add('three', '0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d', 'todo')