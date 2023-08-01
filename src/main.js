import data from './data/countries/countries.js';



//VISUALIZAR LOS PAISES EN LA PANTALLA

// Creamos la función createCards para crear las tarjetas y recibe el parámetro countries 
const createCards = (paises) => {
  //Seleccionamos el elemento section que tiene la clase "grid-container" y lo guardamos en la constante containerCard para que aparezca en la sección
  const containerCard = document.querySelector(".grid-container")
  //Mandamos a crear un elemento dialog que nos servirá más adelante como ventana a mostrar la info de los paises
  const dialog = document.createElement('dialog')
  //Le asignamos el id popuDialog
  dialog.setAttribute('id', 'popupDialog')
  //Le indicamos que saldrá como hijo del section containerCard
  containerCard.appendChild(dialog)
  //ordenamos los países por orden alfabético con un sort  
  paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
  //Recorremos los countries  
  for (let i = 0; i < paises.length; i++) {
    //creamos una sección para mostrar las tarjetas de los países
    const card = document.createElement('section')
    // añadimos clase a la sección (box porque ya la definimos en css anteriormente)
    card.classList.add('box')
    //mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos
    card.innerHTML =
      `<img src="${paises[i].flags.png}"/>    
        <h2>${paises[i].name.common}</h2>`
    // luego appendchile nos trae un "hijo" (tarjeta), sacado de un padre (section que contiene las tarjetas) 
    containerCard.appendChild(card)
  }
}

//Llamamos a la función y le pasamos el argumento data.countries que es donde se encuentra nuestra data
createCards(data.countries);

/* ----------------------------------------------------------------------------------------------------------------------------------*/

//MOSTRAR DATA DE CADA PAÍS AL HACER CLICK

//Primer paso, definir funciones que nos permitan obtener valores de los objetos y arrays de la data

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

//Creamos una función para obtener el valor de Array con 1 resultado (capital y continente)
const validatorArraySimple = (countries) => {
  if (!countries) {
    return "No data"
  }
  const capitalValue = Object.values(countries)
  return capitalValue;
}

//Funcion para array con más de 1 resultado (TLD, timezones, borders)
const validatorMoreArray = (countries) => {
  if (!countries) {
    return 'No data'
  }
  const validatorMoreArraySpace = countries.join(' / ')
  return validatorMoreArraySpace
}

//Funcion para strings (fifa y subregión)
const ValidatorString = (countries) => {
  if (!countries) {
    return "No data"
  }
  return countries;
}


 
//Hacemos nuestra función para mostrar la tarjeta con info completa de un país al hacerle click
const showCards = (paises) => {
  //Seleccionamos el elemento dialog con su ID popupDialog y lo guardamos en la constante popUp      
  const popUp = document.querySelector('#popupDialog');
  // Seleccionamos los elementos de la clase .box que son las tarjetas de cada país y lo guardamos en la constante boxCountries
  const boxCountries = document.querySelectorAll('.box');
  //Recorrremos los elementos de las tarjetas
  for (let i = 0; i < boxCountries.length; i++) {
    //Escuchamos el evento click para los elementos de las tarjetas
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

      // La vamos a mostrar con innerHTML en el elemento dialog que corresponde al popUp        
      popUp.innerHTML = popContent;
      //Creamos un botón que nos servirá para cerrar
      const button = document.createElement("button");
      //Le agregamos una clase al buttton de cerrar
      button.classList.add("closeButton");
      //Mostramos lo que dice el botón de cerrar
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
//Llamamos a la función que nos permitirá mostrar el dialog al hacer click en una tarjeta y le pasamos el argumento data.countries
showCards(data.countries);

/*---------------------------------------------------------------------------------------------------------------------------------*/

//CREAMOS UN BUSCADOR DE PAÍSES CON UN INPUT TEXT

//Seleccionamos el elemento input text por su id countrySearch y lo guardamos en la constante inputSearch
const inputSearch = document.getElementById("countrySearch");
//Función para comparar el valor del input con el nombre de un país y se utiliza async para indicar que la función es asíncrona
const inputFilter = async () => {
  //Volvemos a seleccionar la section que contiene las tarjetas de los países
  const containerCard = document.querySelector(".grid-container")
  //La limpiamos para mostrar después lo que resulte de la función
  containerCard.innerHTML = ''  
  // Obtenemos el valor del input y lo llevamos a minúsculas, lo guardamos en la constante inputValue
  const inputValue = inputSearch.value.toLowerCase();
  //Inicializamos el filtro con un array vacío
  const countryFilter = [];
  //Recorremos los países
  for (const country of data.countries) {
    //Guardamos en una constante los nombre common de los países y los llevamos a minúsculas para compararlos con el valor del input correctamente
    const countryName = country.name.common.toLowerCase();
    //Usamos la condicional que evalúa si el nombre del país contiene la misma letra el valor del input, si es distinto a -1 quiere decir que lo encontró
    if (countryName.indexOf(inputValue) !== -1) {
      //Le agregamos con push el contenido encontrado al nuevo arreglo
      countryFilter.push(country);
    }
  }
  //LLamamos nuevamente a createCards para que nos muestre en la pantalla las tarjetas resultantes del filtro
  createCards(countryFilter);
  //Llamamos nuevamente a showCards después del filtro para que se pueda hacer click al país y salga el dialog
  showCards(countryFilter);

}
//Escuchamos el evento keyup del inputSearch para que nos ejecute en tiempo real la función inputFilter 
inputSearch.addEventListener('keyup', inputFilter);

/*------------------------------------------------------------------------------------------------------------------------------------*/

//Creamos una función para obtener los continentes en el filtro que tendremos en nuestra página
const optionContinentSelect = () => {
  //Seleccionamos el elemento select de donde se despliegan las opciones cuyo id es continents
  const continentSelect = document.getElementById('continentSelect');
  //Acá se crea un array vacío que se utilizará para almacenar los continentes
  const continents = [];
  //Inciamos un bucle forEach para iterar sobre cada objeto country en el array data.countries
  data.countries.forEach(country => {
    //Se inicia otro buclue para iterar sobre cada continente en el array continents dentro de cada objeto country
    country.continents.forEach(continent => {
      //Verificamos si el continente actual no esta incluido en el array continents, para asegurarse de no duplicarlos
      if (!continents.includes(continent)) {
        //Si el continente actual no esta en el array se agrega al array nuevo utilizando push
        continents.push(continent);
        //Mandamos a crear el elemento option que va a mostrar la opción del continente y lo guardamos en la constante option
        const option = document.createElement("option");

        option.classList.add("option-style");
        //Le asignamos el nombre del continente al valor del elemento
        option.value = continent;
        //Se muestra el nombre del continente
        option.text = continent;
        //el elemento option creado se agrega como hijo del elemento continentSelect que es el menú desplegable
        continentSelect.appendChild(option);
      }
    });
  });
}
//Llamamos a la función para que se ejecute
optionContinentSelect();

/*--------------------------------------------------------------------------------------------------*/

//Al seleccionar un continente, debemos mostrar solo las tarjetas de los países que se ubican en ese continente
const select = document.getElementById('continentSelect');
const filterByContinent = () => {
 
  const selectedContinent = select.value;
  
  const filteredCountries = data.countries.filter(country => country.continents.includes(selectedContinent));
  
  const containerCard = document.querySelector(".grid-container");
  containerCard.innerHTML = "";
  
  for (let i = 0; i < filteredCountries.length; i++) {
    const card = document.createElement('section');
    card.classList.add('box');
    card.innerHTML = `
    <img src="${filteredCountries[i].flags.png}"/> 
    <h2>${filteredCountries[i].name.common}</h2>`;
    containerCard.appendChild(card);

  }
  createCards(filteredCountries);
  showCards(filteredCountries);
  return filteredCountries;
}


select.addEventListener('change', filterByContinent);



//COMENTARIOS ADICIONALES

//llamamos a la funcion por el arreglo donde debe buscar// 
/*const filterByInitialCharacter = (paises, letra) => {  //   
    const paisesPorLetra = []   
    for (let i = 0; i < paises.length; i++) {     
        if (paises[i].name.common[0] === letra.toLowerCase() || paises[i].name.common[0] === letra.toUpperCase()) {       
            paisesPorLetra.push(paises[i])//     }//   } // }// filterByInitialCharacter(data.countries,"C")      // TODO ESTO NOS SIRVE PARA FILTRAR*/



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