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

//Seleccionamos el elemento section que tiene la clase "grid-container" y lo guardamos en la constante containerCard
const containerCard = document.querySelector(".grid-container") //Para que aparezca en la sección
// Creamos la función createCards para crear las tarjetas y recibe el parámetro countries 
 const createCards = (paises) => {      
//Recorremos los countries           
    for (let i = 0; i < paises.length; i++) {     
//creamos una sección    
        const card = document.createElement('section')
// añadimos clase a la sección (box porque ya la definimos en css anteriormente)
        card.classList.add('box')  
//mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos
        card.innerHTML = 
        `<img src="${paises[i].flags.png}"/>    
        <h2>${paises[i].name.common}</h2>` 

//FALTA AGREGAR EL SVG Y ALT DE LA IMAGEN
// luego appendchile nos trae un "hijo" (tarjeta), sacado de un padre (section que contiene las tarjetas) 
        containerCard.appendChild(card) 
          
    }
}

//Llamamos a la función y le pasamos el argumento data.countries
createCards(data.countries); 



//MOSTRAR DATA DE CADA PAÍS AL HACER CLICK


const showCards = (paises) => {
    // Seleccionamos los elementos de la clase .box
    const boxCountries = document.querySelectorAll('.box');
    //Seleccionamos el elemento section con su ID        
    const popUp = document.querySelector('#popupDialog');
    //Recorrremos los elementos de las tarjetas
    for (let i = 0; i < boxCountries.length; i++) {
    //Escuchamos el evento click para cada tarjeta
        boxCountries[i].addEventListener('click', () => {
  
    // Creamos un elemento div para mostrar la info
            //const popUpWindow = document.createElement('div')
    //Le agregamos la clase popup
            //popUpWindow.classList.add('popup')
    //Lo mostramos con el innerHTML y agregamos la data a mostrar
           // popUpWindow.innerHTML = 
    
            popUp.innerHTML =
            `<img src="${paises[i].flags.png}"/>    
            <h2>${paises[i].name.common}</h2>
            <p>Official name: ${paises[i].name.official}</p>
            <p>TLD: ${paises[i].tld.join(', ')}</p>
            <p>Independent: ${paises[i].independent ? 'Yes' : 'No'}</p>
            <p>Capital: ${paises[i].capital[0]}</p>
            <p>Subregion: ${paises[i].subregion}</p>
            <p>Languages: ${paises[i].languages.spa}</p>
            <p>Borders: ${paises[i].borders.join(', ')}</p>
            <p>Area: ${paises[i].area}</p>
            <p>Flag: ${paises[i].flag}</p>
            <p>Population: ${paises[i].population}</p>
            <p>Gini: ${paises[i].gini['2014']}</p>
            <p>Fifa: ${paises[i].fifa}</p>
            <p>Timezones: ${paises[i].timezones[0]}</p>
            <p>Continents: ${paises[i].continents[0]}</p>
            <button onclick= "closePopUp()">Cerrar</button>`; 

            popUp.showModal();
        });
        
    };

};

const closePopUp = () => {
    const popUp = document.querySelector('#popupDialog');
    popUp.close();
};

showCards(data.countries);





//llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/

