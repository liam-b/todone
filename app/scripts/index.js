import addDnDHandlers from './drag.js'
import App from './components/App.jsx'
import Sortable from 'sortablejs'
import $ from 'jquery'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

$(document).ready(() => {
  Sortable.create(document.getElementById('ItemList'), {
    'onEnd': function(evt) {
      let list = $('div#ItemList div.Item').toArray().map(function(item) {
        return item.id
      })
      if (typeof list == 'string') list = [list]

      $.post('/web/items/updateOrders', {
        'idList': list
      })
    }
  })
})