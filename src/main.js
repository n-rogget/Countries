import data from './data/countries/countries.js';



//VISUALIZAR LOS PAISES EN LA PANTALLA
//Seleccionamos el elemento section que tiene la clase "grid-container" y lo guardamos en la constante containerCard
const containerCard = document.querySelector(".grid-container") //Para que aparezca en la sección
// Creamos la función createCards para crear las tarjetas y recibe el parámetro countries 

const createCards = (paises) => {
  //Recorremos los countries  

  for (let i = 0; i < paises.length; i++) {
    //creamos una sección    /*  */
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

//Creamos una función para obtener el valor de objetos con más de 1 resultado (Languages)
const validatorMoreObject = (countries) => {
  if (!countries) {
    return "No data"
  }
  const objectCountries = Object.values(countries)
  const validatorObjectSpace = objectCountries.join(' / ')
  return validatorObjectSpace
}

//Creamos una función para obtener el valor de objetos con 1 resultado (Gini)
const validatorObjectSimple = (countries) => {
  if (!countries) {
    return "No data"
  }
  const simpleValue = Object.values(countries)
  return simpleValue[0];
}

//Creamos una función para obtener el valor de Array con 1 resultado capital y continente
const validatorArraySimple = (countries) => {
  if (!countries) {
    return "n/a"
  }
  const capitalValue = Object.values(countries)
  return capitalValue;
}

//Funcion para array con más de 1 resultado TLD, timezones, borders
const validatorMoreArray = (countries) => {
  if (!countries) {
    return 'No data'
  }
  const validatorMoreArraySpace = countries.join(' / ')
  return validatorMoreArraySpace
}

//Funcion para strings fifa y subregión
const ValidatorString = (countries) => {
  if (!countries) {
    return "No data"
  }
  return countries;
}


//Seleccionamos el elemento section con su ID        
const popUp = document.querySelector('#popupDialog');

//Hacemos nuestra función para mostrar la tarjeta con info completa de un país al hacerle click
const showCards = (paises) => {
  // Seleccionamos los elementos de la clase .box
  const boxCountries = document.querySelectorAll('.box');

  //Recorrremos los elementos de las tarjetas
  for (let i = 0; i < boxCountries.length; i++) {
    //Escuchamos el evento click para cada tarjeta
    boxCountries[i].addEventListener('click', () => {

      //Guardamos en una constante la data que vamos a mostrar

      const popContent = `<img src="${paises[i].flags.png}"/>    
            <h2>${paises[i].name.common}</h2>
            <p>Official name: ${paises[i].name.official}</p>
            <p>TLD: ${validatorMoreArray(paises[i].tld)}</p>
            <p>Independent: ${paises[i].independent ? 'Yes' : 'No'}</p>
            <p>Capital: ${validatorArraySimple(paises[i].capital)}</p>
            <p>Subregion: ${ValidatorString(paises[i].subregion)}</p>
            <p>Languages: ${validatorMoreObject(paises[i].languages)}</p>
            <p>Borders: ${validatorMoreArray(paises[i].borders)}</p>
            <p>Area: ${paises[i].area}</p>
            <p>Flag: ${paises[i].flag}</p>
            <p>Population: ${paises[i].population}</p>
            <p>Gini: ${validatorObjectSimple(paises[i].gini)}</p>
            <p>Fifa: ${ValidatorString(paises[i].fifa)}</p>
            <p>Timezones: ${validatorMoreArray(paises[i].timezones)}</p>
            <p>Continents: ${validatorArraySimple(paises[i].continents)}</p>`;

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

//Nos preparamos para recibir la información del input text para buscar el nombre del país. Obtenemos su valor.
const inputSearch = document.getElementById("countrySearch");

//Función para comparar el valor del input con el nombre de un país
const inputFilter = async () => {
  // Obtenemos el valor del input
  const inputValue = inputSearch.value.toLowerCase();
  containerCard.innerHTML = '';
  let countryFilter = [];

  for (let country of data.countries) {
    let countryName = country.name.common.toLowerCase();

    if (countryName.indexOf(inputValue) !== -1) {
      
      countryFilter.push(country);
    }
  }
  
  createCards(countryFilter);
 
}

inputSearch.addEventListener('keyup', inputFilter);




//llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/









 /*const inputFilter = () => {
   // Obtenemos el valor del input
   const inputValue = inputSearch.value.toLowerCase();
   
   containerCard.innerHTML = '';
   
     for (let country of data.countries) {
       let countryName = country.name.common.toLowerCase();
       
       if(countryName.indexOf(inputValue) !== -1) {
         const card = document.createElement('section')
         // añadimos clase a la sección (box porque ya la definimos en css anteriormente)
         card.classList.add('box')
         //mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos
         card.innerHTML =
           `<img src="${country.flags.png}"/>    
             <h2>${country.name.common}</h2>`
       
         // luego appendchile nos trae un "hijo" (tarjeta), sacado de un padre (section que contiene las tarjetas) 
         containerCard.appendChild(card)
       }
     }
   
     
   }
   
   inputSearch.addEventListener('keyup', inputFilter);*/