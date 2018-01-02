const fs = require('fs')

module.exports = {
  'save': function(path, data) {
    fs.writeFile(path, JSON.stringify(data, null, 2), function(err) {
      if (err) console.log(err)
    })
  },

  'load': function(path) {
    return JSON.parse(fs.readFileSync(path))
  }
}