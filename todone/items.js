const uuid = require('uuid/v4')
const database = require('./database.js')

module.exports = {
  'get': function(id) {
    let item = {}

    for (var i = 0; i < db.data.items.length; i++) {
      if (db.data.items[i].id == id) {
        item = db.data.items[i]
        break
      }
    }

    return item
  },

  'getIndex': function(id) {
    let index

    for (var i = 0; i < db.data.items.length; i++) {
      if (db.data.items[i].id == id) {
        index = i
        break
      }
    }

    return index
  },

  'getAll': function() {
    let items = []

    for (var i = 0; i < db.data.items.length; i++) {
      items.push(db.data.items[i])
    }

    return items
  },

  'getAllFromGroup': function(parent) {
    let groupItems = db.data.items.filter(function(item) {
      return item.parent == parent
    })

    groupItems.sort(function(itemA, itemB) {
      if (itemA.order < itemB.order) return -1
      if (itemA.order > itemB.order) return 1
      return 0
    })

    console.log(groupItems)

    return groupItems
  },

  'add': function(content, parent, type) {
    let id = uuid()
    let groupItems = module.exports.getAllFromGroup(parent)
    let highestOrderItem = groupItems[groupItems.length - 1]

    let item = {
      'content': content,
      'id': id,
      'type': type,
      'parent': parent,
      'order': 0
    }

    if (highestOrderItem) {
      item.order = highestOrderItem.order + 1
    }

    db.data.items.push(item)
    database.save(db.path, db.data)

    return item
  },

  'remove': function(id) {
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

  'update': function() {},

  'updateOrders': function(idList) {
    for (var i = 0; i < idList.length; i++) {
      db.data.items[module.exports.getIndex(idList[i])].order = i
    }

    database.save(db.path, db.data)
  }
}