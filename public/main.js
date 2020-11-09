async function getNoticias(){
    let response = await fetch('http://localhost:8080/loadNoticias')
    let noticias = await response.json();
  
    for ( let i = 0; i < noticias.length; i++){
    
      let caja = document.createElement("div");
      caja.className = "titudescri";
      document.querySelector("body").appendChild(caja);
      
      let titulo = document.createElement("h1");
      caja.appendChild(titulo);
      titulo.innerText = noticias[i].titulo;
      titulo.id = `${[i]}`;
      
      let descripcion = document.createElement("h2");
      caja.appendChild(descripcion);
      descripcion.innerText = noticias[i].descripcion;
      descripcion.id = `${[i]}`;

      let botonupdate = document.createElement("button");
      let botondelete = document.createElement("button");
      caja.appendChild(botondelete);
      caja.appendChild(botonupdate);
      botonupdate.innerText = "update";
      botondelete.innerText = "delete";
      botonupdate.id = `${[i]}`;
      botondelete.id = `${[i]}`;

      ///// hasta aqui muestra datos
      ///// y empieza eliminar datos mediante boton 

      document.getElementById(`${[i]}`).addEventListener("click",enviardatoseliminados);

function enviardatoseliminados(){

enviardatoseliminadosahorais();

}
async function enviardatoseliminadosahorais(){

  await fetch('http://localhost:8080/deleteNoticias', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "noticia" : [i]})
    })
  }

/////////acaba eliminar
////////empieza actualizar
document.getElementById(`${[i]}`).addEventListener("click",enviardatosactualizados);
function enviardatosactualizados() {

  let titulo = document.querySelector("#titulolabel").value;
  let descripcion = document.querySelector("#titulotexto").value;
  
  let nuevaNoticiaactualizada = {
    "titulo"      : `${ titulo }`,
    "descripcion" : `${ descripcion }`,
  }
  enviarUpdates(nuevaNoticiaactualizada);
}
async function enviarUpdates(){

await fetch('http://localhost:8080/updateNoticias', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "4" : 
    {  
           "descripcion": "la noticia numero dos",
           "titulo": "esta actualiza22222333333334444444444"
       }
   })
  })
}

      };//cierra FOR
  
  }
  getNoticias();


  ////////////////////////////////
// envio datos desde JS a firebase con input HTML


document.querySelector("#pulsar").addEventListener("click",enviardatos);

function enviardatos() {

  let titulo = document.querySelector("#titulolabel").value;
  let descripcion = document.querySelector("#titulotexto").value;
  
  let nuevaNoticia = {
    "titulo"      : `${ titulo }`,
    "descripcion" : `${ descripcion }`,
  }

  enviarNoticias(nuevaNoticia);
}

async function enviarNoticias(noticiaEnviada){
      
  
  await fetch('http://localhost:8080/cargarNoticias', {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(noticiaEnviada)
  })
}
//
/*
document.querySelector("#pulsarparaactualizar").addEventListener("click",enviardatosactualizados);

function enviardatosactualizados() {

  let titulo = document.querySelector("#titulolabel").value;
  let descripcion = document.querySelector("#titulotexto").value;
  
  let nuevaNoticiaactualizada = {
    "titulo"      : `${ titulo }`,
    "descripcion" : `${ descripcion }`,
  }

  enviarUpdates(nuevaNoticiaactualizada);
}


async function enviarUpdates(){

await fetch('http://localhost:8080/updateNoticias', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "4" : 

    {  
           "descripcion": "la noticia numero dos",
           "titulo": "esta actualiza22222333333334444444444"
       }
   
   
   
   })
  })
}
*/