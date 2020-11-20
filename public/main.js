async function enviardatoseliminadosahorais(idNoticia){

  await fetch('http://localhost:8080/deleteNoticias', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "noticia" : idNoticia})
    })
}

async function enviarUpdates(idNoticia, datos){

  await fetch('http://localhost:8080/updateNoticias', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "noticia" : idNoticia, "datos" : datos })
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

      let botondelete = document.createElement("button");
      let botonupdate = document.createElement("button");
      caja.appendChild(botondelete);
      caja.appendChild(botonupdate);
      botondelete.innerText = "delete";
      botonupdate.innerText = "update";
      botondelete.id = `d${[i]}`; // las letras d y u + el iterador hacen diferenciarse a todos los botones
      botonupdate.id = `u${[i]}`; // mostrados para realizar las funciones de borrar y actualizar 

      document.getElementById(`d${[i]}`).addEventListener("click",() => {
        enviardatoseliminadosahorais(noticias[i].id) // recojo solo el dato id de las noticias
      });

///////////////////////////// pasa una movida

        document.getElementById(`u${[i]}`).addEventListener("click",() => {
        
        pintarFormulario(noticias[i]) // recojo todas las noticias al completo
// una vez pintado el formulario de actualizacion tienes q hacer click a ENVIAR actualizacion para luego
// pasarle los datos nuevos
///////////////// click evento y guardar noticia para enviar y actualizar ////////////////////       
            document.querySelector("#botonenviar").addEventListener("click", () => {
               enviaralgoqseactualiza(noticias[i].id);
         });
        });
      };//cierra FOR
  
    }
    
  getNoticias();
//////////////////// nueva funcion
  function enviaralgoqseactualiza(idNoticia){
                    
    let inputtitulo = document.querySelector("#titulolabelactualizar").value;
    let inputdescripcion = document.querySelector("#descripcionlabelactualizar").value;
      
    let nuevaNoticiaActualizada = {
        "titulo"      : `${ inputtitulo }`,
        "descripcion" : `${ inputdescripcion }`
      }

      enviarUpdates(idNoticia, nuevaNoticiaActualizada);
    }
/////////////////////////////////////////////////
function pintarFormulario(noticia) { // sigue sin tener las noticias para hacer el click :)
// este formulario en realidad pinta 2 input para actualizar y al mostrar tan solo 1 noticia por lo tanto 
// aunque recibe todas las noticias, solo seleccionamos una aqui &&&&&
  let labeltitulo = document.createElement("label");
  labeltitulo.htmlFor = "titulolabelactualizar";
  labeltitulo.innerText = noticia.titulo; // &&&&
  
  let inputtitulo = document.createElement("input");
  inputtitulo.type = "text";
  inputtitulo.id = "titulolabelactualizar";
  inputtitulo.value = noticia.titulo;
  
  let cajaactualizar = document.createElement("div");
  cajaactualizar.className = "actualizarborde";
  document.querySelector("body").appendChild(cajaactualizar);
  
  let botonenviar = document.createElement("button");
  botonenviar.innerText = "enviar actualizacion";
  botonenviar.id = "botonenviar";
  
  let labeldescripcion = document.createElement("label");
  labeldescripcion.htmlFor = "descripcionlabelactualizar";
  labeldescripcion.innerText = noticia.descripcion;
  
  let inputdescripcion = document.createElement("input");
  inputdescripcion.type = "text";
  inputdescripcion.id = "descripcionlabelactualizar"
  inputdescripcion.value = noticia.descripcion;
  // appendchild es importante el orden por el cual entran en las etiquetas
  cajaactualizar.appendChild(labeltitulo);
  cajaactualizar.appendChild(inputtitulo);
  cajaactualizar.appendChild(labeldescripcion);
  cajaactualizar.appendChild(inputdescripcion);
  cajaactualizar.appendChild(botonenviar);
}
///////////////////////////////////////////////
// envio datos desde JS a firebase con input HTML
document.querySelector("#pulsar").addEventListener("click", enviardatos);

function enviardatos(){

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