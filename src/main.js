//import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/countries/countries.js';
// import data from './data/rickandmorty/rickandmorty.js';


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

//Creamos una función para obtener un arreglo del objeto Languages
const getLanguage = (languages) => {
    const arrayLanguage = Object.values(languages)
    let languageString = ""
    for (const language of arrayLanguage){
     
      
      languageString = languageString + language + " "
      
    }
    return languageString;
  }

  //Creamos una función para obtener el valor de Gini
  const getGini = (gini) => {
    if (!gini) {
        return "No" 
    }
    const giniValue = Object.values(gini)
        return giniValue[0];
  }

  //Creamos una función para obtener el valor de Capital
  const getCapital = (capital) => {
    if (!capital) {
        return "No" 
    }
    const capitalValue = Object.values(capital)
        return capitalValue;
  }


const showCards = (paises) => {
    // Seleccionamos los elementos de la clase .box
    const boxCountries = document.querySelectorAll('.box');
    //Seleccionamos el elemento section con su ID        
    const popUp = document.querySelector('#popupDialog');

    
    //Recorrremos los elementos de las tarjetas
    for (let i = 0; i < boxCountries.length; i++) {
    //Escuchamos el evento click para cada tarjeta
        boxCountries[i].addEventListener('click', () => {
            console.log(boxCountries[i]);
    //Guardamos en una constante la data que vamos a mostrar
           
            const popContent = `<img src="${paises[i].flags.png}"/>    
            <h2>${paises[i].name.common}</h2>
            <p>Official name: ${paises[i].name.official}</p>
            <p>TLD: ${paises[i].tld}</p>
            <p>Independent: ${paises[i].independent ? 'Yes' : 'No'}</p>
            <p>Capital: ${getCapital(paises[i].capital)}</p>
            <p>Subregion: ${paises[i].subregion}</p>
            <p>Languages: ${getLanguage(paises[i].languages)}</p>
            <p>Borders: ${paises[i].borders}</p>
            <p>Area: ${paises[i].area}</p>
            <p>Flag: ${paises[i].flag}</p>
            <p>Population: ${paises[i].population}</p>
            <p>Gini: ${getGini(paises[i].gini)}</p>
            <p>Fifa: ${paises[i].fifa}</p>
            <p>Timezones: ${paises[i].timezones[0]}</p>
            <p>Continents: ${paises[i].continents[0]}</p>`;
    
    // La vamos a mostrar con innerHTML        
            popUp.innerHTML = popContent;
    //Creamos un botón
            const button = document.createElement("button");
    //Le agregamos una clase al buttton
            button.classList.add("closeButton");
    
            button.innerHTML = "Cerrar";
    //Del dialog sale un hijo button
            popUp.appendChild(button);
    //Le escuchamos el click al button y cerramos
            button.addEventListener('click', () => {
                popUp.close();
            });
    //Usamos el método showModal() para mostrar el elemento dialog       
            popUp.showModal();
        });   
    }

 

};

showCards(data.countries);







//llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/

