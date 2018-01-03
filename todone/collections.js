const uuid = require('uuid/v4')
const database = require('./database.js')

module.exports = {
  'get': function(id) {
    let collection = {}

    for (var i = 0; i < db.data.collections.length; i++) {
      if (db.data.collections[i].id == id) {
        collection = db.data.collections[i]
        break
      }
    }

    return collection
  },

  'getIndex': function(id) {
    let index = 0

    for (var i = 0; i < db.data.collections.length; i++) {
      if (db.data.collections[i].id == id) {
        index = i
        break
      }
    }
    database.save(db.path, db.data)

    return index
  },

  'getAll': function() {
    let collections = []

    for (var i = 0; i < db.data.collections.length; i++) {
      collections.push(db.data.collections[i])
    }

    return collections
  },

  'add': function(name, type, parent) {
    let id = uuid()
    let collection = {
      'name': name,
      'id': id,
      'type': type,
      'parent': parent
    }

    db.data.collections.push(collection)
    database.save(db.path, db.data)

    return collection
  },

  'remove': function(id) {
    let collection = {}

    for (var i = 0; i < db.data.collections.length; i++) {
      if (db.data.collections[i].id == id) {
        collection = db.data.collections[i]
        db.data.collections.splice(i, 1)
        break
      }
    }
    database.save(db.path, db.data)

    return collection
  },

  'update': function(id, name, parent) {
    let collectionIndex = db.getCollectionIndex(id)

    db.data.collections[collectionIndex].name = name
    db.data.collections[collectionIndex].parent = parent

    let parentIndex = db.getCollectionIndex(parent)
    db.data.collections.move(collectionIndex, parentIndex)

    database.save(db.path, db.data)

    return db.data.collections[parentIndex + 1]
  }
}