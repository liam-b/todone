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
  response.render('index', {
    todone: todone,
    'indentOnParent': indentOnParent
  })
})

app.listen(3000, () => {
  console.info('started on port 3000')
})