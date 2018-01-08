module.exports = (app, todone) => {
  app.get('/api/items/getAll', (request, response) => {
    console.log('sending', todone.items.getAll())
    response.json({
      items: todone.items.getAll()
    })
    response.end()
  })
}