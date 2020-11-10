let firebase = require('firebase');
// todos los require deben ir los primeros

const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const listenPort = 8080;

const staticFilesPath = express.static('public');
server.use(staticFilesPath);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// inicializar firebase

function init(){
  let firebaseConfig = {
    apiKey: "AIzaSyCfoLHOoi8t_gjhFcDDBIjadtxqF3NuHQQ",
    authDomain: "el-formu.firebaseapp.com",
    databaseURL: "https://el-formu.firebaseio.com",
    projectId: "el-formu",
    storageBucket: "el-formu.appspot.com",
    messagingSenderId: "40809937070",
    appId: "1:40809937070:web:63d6636fd38bd5df9cd53f"
  };
  
  firebase.initializeApp(firebaseConfig);
  }
  init();  

// base de datos por defecto
let defaultDatabase = firebase.database();
// ruta a la base de datos
let noticiasRef = defaultDatabase.ref("noticias");

/////////////////////
// get METHOD
server.get('/loadNoticias', (req, res) => {

    noticiasRef.once('value', function(snapshot) {
      //if no esta vacio snapshot creo la referencia 
      // y si esta traigo noticias
        let noticias = keys.values( snapshot.val() );
            res.send(noticias);        
    });
});

////////////////////
// POST method route
server.post('/cargarNoticias', (req, res) => {

  let noticiaRecibida = req.body;
       firebase.database().ref("noticias").push(noticiaRecibida);
            res.send("ok")
});

////////////////
  // delete method
  server.delete('/deleteNoticias', function (req, res) {
    console.log(req.body.noticia)
    let noticiaEliminada = req.body.noticia;
       firebase.database().ref("noticias/"+noticiaEliminada).remove();
          res.send('ok , fue deleteado')
  })

///////////////////
// put method :)
server.put('/updateNoticias', function (req, res) {
    
    let noticiaActualizada = req.body;
       firebase.database().ref("noticias").update(noticiaActualizada);
          res.send('ok, fue actualizado')
  })

server.listen(listenPort, () => console.log(`Server listening on ${listenPort}`));