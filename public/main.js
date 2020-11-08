async function getNoticias(){
    let response = await fetch('http://localhost:8080/loadNoticias')
    let noticias = await response.json();
  
    /*
    fetch('http://localhost:8080/loadNoticias')
          .then(resp => resp.json())
          .then(noticias => {
    */
  
    for ( let i = 0; i < noticias.length; i++){
    
      let caja = document.createElement("div");
      caja.className = "titudescri";
      document.querySelector("body").appendChild(caja);
      
      let titulo = document.createElement("h1");
      caja.appendChild(titulo);
      titulo.innerText = noticias[i].titulo;
      
      let descripcion = document.createElement("h2");
      caja.appendChild(descripcion);
      //document.querySelector(".titudescri").appendChild(descripcion);
      descripcion.innerText = noticias[i].descripcion;
      
      };
  
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


///////////
// DELTE
document.querySelector("#pulsarparaeliminar").addEventListener("click",enviardatoseliminados);

function enviardatoseliminados(){

enviardatoseliminadosahorais();

}
async function enviardatoseliminadosahorais(){

  await fetch('http://localhost:8080/deleteNoticias', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "noticia" : "1" })
    })
  }