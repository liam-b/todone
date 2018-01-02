const uuid = require('uuid/v4')

module.exports = {
  'getItem': function() {},

  'getAll': function() {
    let items = []

    for (var i = 0; i < db.data.items.length; i++) {
      items.push(db.data.items[i])
    }

    return items
  },

  'addItem': function(content, parent, type) {
    let id = uuid()
    let item = {
      'content': content,
      'id': id,
      'type': type,
      'parent': parent
    }

    db.data.items.push(item)
    database.save(db.path, db.data)

    return item
  },

  'removeItem': function(id) {
    let item = {}

    for (var i = 0; i < db.data.items.length; i++) {
      if (db.data.items[i].id == id) {
        item = db.data.items[i]
        db.data.items.splice(i, 1)
        break
      }
    }
    database.save(db.path, db.data)

    return item
  },

  'updateItem': function() {}
}