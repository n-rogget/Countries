//import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/countries/countries.js';
// import data from './data/rickandmorty/rickandmorty.js';

//console.log(data);

//const primerPais = data[][0];
//console.log(primerPais["name"]["common"]);

/*const nombresPaises = [];
for (let i = 0; i < data.countries.length; i++) {
    const pais = data.countries[i];
    nombresPaises.push(pais.name.common);
}

console.log(nombresPaises);

const banderasPaises = [];
for (let i = 0; i < data.countries.length; i++) {
    const bandera = data.countries[i];
    banderasPaises.push(bandera.flags.png);

}

console.log(banderasPaises);*/

const containerCard = document.querySelector(".grid-container")  //Para que aparezca en la sección
const createCards = (paises) => {                    //creamos las tarjetas con parametro países, para poder ocupar este parametro más adelante  
    for (let i = 0; i < paises.length; i++) {         //Recorremos los paises       
        const card = document.createElement('section')  //creamos una sección     
        card.classList.add('box')                       // añadimos clase a la sección (box porque ya la definimos en css anteriormente)    
        card.innerHTML = `<img src="${paises[i].flags.png}"/>    
                        <h2>${paises[i].name.common}</h2>`    
        containerCard.appendChild(card)                 //mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos                                                    
        // luego appendchile nos trae un "hijo", sacado de un padre (ponemos en grid container la seccion)  
    }
}
createCards(data.countries); //llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/