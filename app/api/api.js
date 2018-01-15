import * as firebase from 'firebase'

var config = {
  'apiKey': 'AIzaSyCrPUAfoYp32q8zmVYgDP-yB85Ch6Nra88',
  'authDomain': 'todo-b504.firebaseapp.com',
  'databaseURL': 'https://todo-b504.firebaseio.com',
  'projectId': 'todo-b504',
  'storageBucket': '',
  'messagingSenderId': '886117101758'
}
firebase.initializeApp(config)

var database = firebase.database()

firebase.database().ref('test/' + userId).set({
  'message': 'hi'
})
