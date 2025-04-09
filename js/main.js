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
        console.log(characters);//mostramos en consola los elemento que solicitamos para comprovar
        mostrarPersonajes(characters.slice(0, 4)) //mostramos los primeros 4 personajes
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
        card.innerHTML = `
        <img class="card-image" src="${personaje.images?.[1] || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}" alt="${personaje.name}">
        <div  class="card-content">
                <h2 class="card-title">${personaje.name}</h2>
                <p class="card-head">Clan: ${personaje.family?.clan || 'Desconocido'}</p>
                <p class="card-description">Aldea: ${personaje.village || 'Desconocida'}</p>
            </div>
        `;
        container.appendChild(card)
    })
}