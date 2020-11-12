async function enviardatoseliminadosahorais(idNoticia){

  await fetch('http://localhost:8080/deleteNoticias', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "noticia" : idNoticia})
    })
}

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
      
      let descripcion = document.createElement("h2");
      caja.appendChild(descripcion);
      descripcion.innerText = noticias[i].descripcion;

      let botonupdate = document.createElement("button");
      let botondelete = document.createElement("button");
      caja.appendChild(botondelete);
      caja.appendChild(botonupdate);
      botonupdate.innerText = "update";
      botondelete.innerText = "delete";
      botonupdate.id = `${[i]}`;
      botondelete.id = `${[i]}`;

//noticias[i].id;
//console.log(noticias[i].id)

      ///// hasta aqui muestra datos
      ///// y empieza eliminar datos mediante boton 

      document.getElementById(`${[i]}`).addEventListener("click",() => {
        enviardatoseliminadosahorais(noticias[i].id)
      });


/////////acaba eliminar

////////empieza actualizar
document.getElementById(`${[i]}`).addEventListener("click",enviardatosactualizados);

function enviardatosactualizados() {

let labeltitulo = document.createElement("label");
labeltitulo.htmlFor = "titulolabelactualizar";

let inputtitulo = document.createElement("input");
inputtitulo.type = "text";
inputtitulo.id = "titulolabelactualizar";
inputtitulo.value = noticias[i].titulo;

let cajaactualizar = document.createElement("div");
cajaactualizar.className = "actualizarborde";
document.querySelector("body").appendChild(cajaactualizar);

cajaactualizar.appendChild(labeltitulo);
cajaactualizar.appendChild(inputtitulo);




/*

//let labeldescripcion = document.createElement("label");
//let inputdescripcion = document.createElement("input");

labeltitulo.htmlFor = "titulolabelactualizar";
inputtitulo.type = "text";
inputtitulo.id = "titulolabelactualizar";
inputtitulo.value = noticias[i].titulo;

//labeldescripcion.htmlFor = "titulotextoactualizar";
//inputdescripcion.type = "text";
//inputtitulo.id = "titulotextoactualizar";
//inputdescripcion.value = noticias[i].descripcion;

  let cajaactualizar = document.createElement("div");
  cajaactualizar.className = "actualizarborde";
  document.querySelector("body").appendChild(cajaactualizar);
  
  let tituloactualizar = document.createElement("h1");
  cajaactualizar.appendChild(tituloactualizar);
  titulo.innerText = noticias[i].tituloactualizar;
  
  let descripcionactualizar = document.createElement("h2");
  cajaactualizar.appendChild(descripcionactualizar);
  descripcion.innerText = noticias[i].descripcionactualizar;

  cajaactualizar.appendChild(labeltitulo);
  //cajaactualizar.appendChild(labeldescripcion);

  */

/*
  let titulo = document.getElementById(`${[i]}+titulo`).value;
  let descripcion = document.getElementById(`${[i]}+descripcion`).value;
  
  let nuevaNoticiaactualizada = {
    "titulo"      : `${ titulo }`,
    "descripcion" : `${ descripcion }`,
  }
  */
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