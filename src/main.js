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



//VISUALIZAR LOS PAISES EN LA PANTALLA
const containerCard = document.querySelector(".grid-container") //Para que aparezca en la sección
 
 const createCards = (paises) => {                    //creamos las tarjetas con parametro países, para poder ocupar este parametro más adelante  
    for (let i = 0; i < paises.length; i++) {     //Recorremos los paises
         
        const card = document.createElement('section')  //creamos una sección     
        card.classList.add('box')                       // añadimos clase a la sección (box porque ya la definimos en css anteriormente)    
        card.innerHTML = `<img src="${paises[i].flags.png}"/>    
                        <h2>${paises[i].name.common}</h2>`    //mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos 
        containerCard.appendChild(card) // luego appendchile nos trae un "hijo", sacado de un padre (ponemos en grid container la seccion)
          
    }
}
createCards(data.countries); 

//MOSTRAR DATA DE CADA PAÍS AL HACER CLICK


const showCards = (paises) => {
    const boxCountries = document.querySelectorAll('.box');
    for (let i = 0; i < boxCountries.length; i++) {
        
        boxCountries[i].addEventListener('click', () => {
            console.log('Clickeaste la tarjeta:', i);
            const popUp = document.querySelector('#popupContainer');
        
            const popUpWindow = document.createElement('div')
            popUpWindow.classList.add('popup')
            popUpWindow.innerHTML = `<img src="${paises[i].flags.png}"/>    
            <h2>${paises[i].name.common}</h2>
            <p>Nombre oficial: ${paises[i].name.official}
            <button onclick= "closePopUp()">Cerrar</button>`; 

            popUp.appendChild(popUpWindow);
        });
        
    };
};

function closePopUp () {
    const popUpWindow = document.querySelector('.popup');
    popUpWindow.remove();
}

showCards(data.countries);





//llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/

