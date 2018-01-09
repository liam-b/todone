import addDnDHandlers from './drag.js'

import App from './components/App.jsx'

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// $(document).ready(() => {
//   // $('select').material_select()
//   //
//   // $('div.workspace div div select').change(() => {
//   //   console.log('localhost:3000' + '/collection?id=' + $(this).find(':selected').get(0).id)
//   //   window.location.replace('http://localhost:3000' + '/collection?id=' + $(this).find(':selected').get(0).id + 'potato')
//   // })
// })