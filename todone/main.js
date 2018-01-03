Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    var k = new_index - this.length
    while ((k--) + 1) {
      this.push(undefined)
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0])
  return this
}
Array.prototype.insert = function (item, index) {
  this.splice(index, 0, item)
}

const database = require('./database.js')
const collections = require('./collections.js')
const items = require('./items.js')

module.exports = class {
  constructor (path) {
    global.db = {}
    global.db.path = './db.json'
    global.db.data = database.load(db.path)

    this.collections = collections
    this.items = items
  }
}