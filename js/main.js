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
        console.log(data);//mostramos en consola los elemento que solicitamos para comprovar
    })
//.catch(error => console.log('Error al obtener los personajes', error))