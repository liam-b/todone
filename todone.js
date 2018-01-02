Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length
        while ((k--) + 1) {
            this.push(undefined)
        }
    }
    this.splice(new_index + 1, 0, this.splice(old_index, 1)[0])
    return this
}

Array.prototype.insert = function (item, index) {
    this.splice(index, 0, item)
}

const fs = require('fs')
const uuid = require('uuid/v4');

// Start date
// Due Date
// Recurrence
// Estimate
// Time tracked
// Group Label

// starting on [date][time] every [recurrence] at [date][time] due on [date][time] ending [date][time]

// valid dates: today tomorrow

// clear items when project is deleted

class Todone {
  constructor (databasePath) {
    this.databasePath = databasePath
    this.data = JSON.parse(fs.readFileSync(this.databasePath))
  }

  _save() {
    fs.writeFile(this.databasePath, JSON.stringify(this.data, null, 2), function(err) {
      if (err) console.log(err)
    })
  }

  // --- //

  addWorkspace(name) {
    return this.addCollection(name, 'workspace', '')
  }

  removeWorkspace(id) {
    return this.removeCollection(id)
  }


  addGroup(name, parent) {
    return this.addCollection(name, 'group', parent)
  }

  removeGroup(id) {
    return this.removeCollection(id)
  }


  addTodo(content, parent) {
    return this.addItem(content, parent, 'todo')
  }

  removeTodo(id) {
    return this.removeItem(id)
  }
}

module.exports = Todone

// var todone = new Todone('./db.json')
// //
// // // todone.addGroup('inbox', '0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d')
// // // todone.removeGroup('87537141-16c2-450a-b094-ce100a94a426')
// // // todone.removeTodo('8be9f946-82ff-40da-bb2b-77c04cc75f63')
// // todone.addTodo('my todo note!', 'ae85cf32-f95e-4533-b504-7aadff3af756')
//
// todone.updateCollection('ae85cf32-f91e-4533-b504-7aadff3af756', 'boop', '0bbeb67d-7dd1-4c64-a9bb-78f7b851fb6d')





