//Traer personajes de la api
const apiUrl = 'https://dattebayo-api.onrender.com/characters?pageSize=1431'
let characters = [] //Acá voy a guardar los 20 personajes

//uso fetch para obtener los dats de la api
fetch(apiUrl)
    .then(response => response.json()) //aca se combierte la respuesta en JSON para mejor visvilidad
    .then(data =>{
        //characters = data.slice(0, 19); //aca solo tomamos los primero 20 elementos(desde la posicion 0 hasta la 19), en caso de que la api devuelva muchos elementos
        //como la api por defecto devuelve 20 elementos a peasar de tener 1431, no es necesario tomar solo 20
        characters = data.characters; //ahora accedemos al array
        cambiarPagina(1) //mostrar la primera pagina al iniciar
        console.log(characters);//mostramos en consola los elemento que solicitamos para comprovar
        //mostrarPersonajes(characters.slice(0, 4)) //mostramos los primeros 4 personajes
    })
.catch(error => console.log('Error al obtener los personajes', error))

//Creamos la funcion para mostrar los personajes
function mostrarPersonajes(personajes){
    /**Se busca el elemento con el ID 'cards-container' en el HTML y se guarda en 
     una constante para poder acceder a él y modificarlo desde JavaScript, sin necesidad de editar el HTML directamente.**/
    const container = document.getElementById('cards-container')
    /** innerHTML se usa para cambiar el contenido de un contenedor. Básicamente, busca el elemento que le pasamos (en este caso container, que es el que 
    tiene el ID 'cards-container' en el HTML) y reemplaza todo lo que tiene dentro por el HTML nuevo que le digamos. Así podemos modificar lo que se muestra en la página sin tocar el HTML directamente.
    en este caso, nosotros como nuevo contenido le mandamos un caracter de espacio para  eliminar todo lo que tenia previamente y dejarlo limpio**/
    container.innerHTML = '' 
    //personajees un array de objetos, cada objeto es un personaje  
    personajes.forEach(personaje =>{
        //Creamos un elemento div para cada personaje
        const card = document.createElement('div')
        //le agregamos una clase para poder estilizarlo
        card.classList.add('card')

        //usamos imagen, nombre, y un dato adicional como clan o aldea
        //se trabaja como objeto, siendo personaje el objeto y name o images las propiedades
        //para que todo salga bien en ete momento, hay que revisar la respueta de la api para averiguar que deseamos extraer y mostrar
        card.innerHTML = `
        <img class="card-image" src="${personaje.images?.[0] || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}" alt="${personaje.name}">
        <div  class="card-content">
                <h2 class="card-title">${personaje.name}</h2>
                <p class="card-head">Clan: ${personaje.personal?.clan || 'Desconocido'}</p>
                <p class="card-description">Aldea: ${personaje.personal?.affiliation?.[0] || 'Desconocida'}</p>
            </div>
        `;
        container.appendChild(card)
    })
}

let paginaActual = 1; //Guardamos el numero de pagina actual la principal
const personajesPerPagina = 4; //Guardamos el numero de personajes por pagina

//Creamos la funcion para cambiar de pagina y actualizar la pagina
function cambiarPagina(nuevaPagina){
    const totalPaginas = Math.ceil(characters.length / personajesPerPagina); //calculamos el numero total de paginas
    if(nuevaPagina < 1 || nuevaPagina > totalPaginas)return; //si la pagina es menor a 1 o mayor a la total de paginas, no hacemos nada

    paginaActual = nuevaPagina; //actualizamos la pagina actual
    const inicio = (paginaActual - 1) * personajesPerPagina //calculamos el inicio de la pagina actual
    const fin = inicio + personajesPerPagina //calculamos el fin de la pagina actual
    const personajesPagina = characters.slice(inicio, fin) //creamos un array con los personajes de la pagina actual
    
    mostrarPersonajes(personajesPagina) //mostramos los personajes de la pagina actual
    document.getElementById('pagina-actual').textContent = paginaActual //actualizamos el texto del boton de pagina actual
}

document.getElementById('anterior').addEventListener('click', () =>{
    cambiarPagina(paginaActual - 1);
});

document.getElementById('siguiente').addEventListener('click', () =>{
    cambiarPagina(paginaActual + 1)
} );

