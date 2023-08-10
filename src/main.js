import { filterByInput, findByContinent, areaOrder, calculo} from './data.js';
import data from './data/countries/countries.js';

//VISUALIZAR LOS PAISES EN LA PANTALLA

const containerCard = document.querySelector(".grid-container");
//funcion que ordena de A a Z
const sortByAZ = (paises) => {
  paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
}
// Creamos la función createCards para crear las tarjetas y recibe el parámetro countries 
const createCards = (paises) => {
  //Mandamos a crear un elemento dialog que nos servirá más adelante como ventana a mostrar la info de los paises
  const dialog = document.createElement('dialog')
  //Le asignamos el id popuDialog
  dialog.setAttribute('id', 'popupDialog')
  //Le indicamos que saldrá como hijo del section containerCard
  containerCard.appendChild(dialog)
  //Recorremos los countries  
  for (let i = 0; i < paises.length; i++) {
    //creamos una sección para mostrar las tarjetas de los países
    const card = document.createElement('section')
    // añadimos clase a la sección (box porque ya la definimos en css anteriormente)
    card.classList.add('box')
    //mandamos a html la imagen y el nombre, con $para que busque lo que le pedimos
    card.innerHTML =
      `<img alt= 'bandera del país' src="${paises[i].flags.png}"/>    
        <h2>${paises[i].name.common}</h2>`
    // luego appendchile nos trae un "hijo" (tarjeta), sacado de un padre (section que contiene las tarjetas) 
    containerCard.appendChild(card)
  }
}

//Llamamos a la función y le pasamos el argumento data.countries que es donde se encuentra nuestra data
sortByAZ(data.countries);
createCards(data.countries);


/* ----------------------------------------------------------------------------------------------------------------------------------*/

//MOSTRAR DATA DE CADA PAÍS AL HACER CLICK

//Primer paso, definir funciones que nos permitan obtener valores de los objetos y arrays de la data

//Creamos una función para obtener el valor de objetos con más de 1 resultado (Languages)
const validatorMoreObject = (countries) => {
  return !countries ? "No data" : Object.values(countries).join(' / ');
}
//si country es nulo devuele no data, si no devuelve el valor
//Creamos una función para obtener el valor de objetos con 1 resultado (Gini)
const validatorObjectSimple = (countries) => {
  return !countries ? "No data" : Object.values(countries)[0];
}

//Creamos una función para obtener el valor de Array con 1 resultado (capital y continente)
const validatorArraySimple = (countries) => {
  return !countries ? "No data" : Object.values(countries);
}

//Funcion para array con más de 1 resultado (TLD, timezones, borders)
const validatorMoreArray = (countries) => {
  return !countries ? "No data" : countries.join(' / ');
}

//Funcion para strings (fifa y subregión)
const ValidatorString = (countries) => {
  return !countries ? "No data" : countries;
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
      const popContent = `
            <img alt= 'bandera del país' src="${paises[i].flags.png}"/>    
            <h2>${paises[i].name.common}</h2>
            <section id= "contenedor">
            <section> 
            <p>Official name: ${paises[i].name.official}</p>
            <p>TLD: ${validatorMoreArray(paises[i].tld)}</p>
            <p>Independent: ${paises[i].independent ? 'Yes' : 'No'}</p>
            <p>Capital: ${validatorArraySimple(paises[i].capital)}</p>
            <p>Subregion: ${ValidatorString(paises[i].subregion)}</p>
            <p>Languages: ${validatorMoreObject(paises[i].languages)}</p>
            <p>Borders: ${validatorMoreArray(paises[i].borders)}</p>           
            <p>Area: ${paises[i].area} kms²</p>
            </section>
            <section>
            <p>Flag: ${paises[i].flag}</p>
            <p>Population: ${paises[i].population} people</p>
            <p>Gini: ${validatorObjectSimple(paises[i].gini)}</p>
            <p>Fifa: ${ValidatorString(paises[i].fifa)}</p>
            <p>Timezones: ${validatorMoreArray(paises[i].timezones)}</p>
            <p>Continents: ${validatorArraySimple(paises[i].continents)}</p>
            <p>Population density: ${calculo(paises[i].population, paises[i].area)} people per km²</p>
            </section>
            </section>
            `



      // La vamos a mostrar con innerHTML en el elemento dialog que corresponde al popUp        
      popUp.innerHTML = popContent;
      //Creamos un botón que nos servirá para cerrar
      const button = document.createElement("button");
      //Le agregamos una clase al buttton de cerrar
      button.classList.add("closeButton");
      //Mostramos lo que dice el botón de cerrar
      button.textContent = "Cerrar";
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
sortByAZ(data.countries)
showCards(data.countries);


/*---------------------------------------------------------------------------------------------------------------------------------*/

//CREAMOS UN BUSCADOR DE PAÍSES CON UN INPUT TEXT

//Seleccionamos el elemento input text por su id countrySearch y lo guardamos en la constante inputSearch
const inputSearch = document.getElementById("countrySearch");

//Función para comparar el valor del input con el nombre de un país
const inputFilter =  () => {
 

  //La limpiamos para mostrar después lo que resulte de la función
  containerCard.innerHTML = ''
  // Obtenemos el valor del input y lo llevamos a minúsculas, lo guardamos en la constante inputValue
  const inputValue = inputSearch.value.toLowerCase();
  // Llamamos a la función filterBypInput que esta en data.js con sus argumentos, la data y el valor del input
  const countryFilter = filterByInput(data.countries, inputValue);
  //Creamos una condicional por si el arreglo lo devuelve vacío (no hay coincidencias)
  if (countryFilter.length === 0) {
    
    // añadimos una nueva clase a containerCard para el texto del mensaje
    containerCard.classList.add('message')
    //mandamos a mostrar le mensaje con textContent
    containerCard.textContent = '...No results found';
    
  }
  sortByAZ(countryFilter);
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
//Creamos la función que va a filtrar por continente
const filterByContinent = () => {
  //Seleccionamos el valor del select y lo guardamos en la constante selectedContinent
  const selectedContinent = select.value;
  //guardamos la funcion findeByContinent que esta en data.js con sus argumentos en la constante filteredCountries
  const filteredCountries = findByContinent(data.countries, selectedContinent)
  //Vamos a mostrar en containerCard los paises que resulten del filtrado, seleccionamos el contenedor de tarjetas
 
  //Lo limpiamos
  containerCard.innerHTML = "";
  //Llamamos a la función que muestra las tarjetas y la que permite abrir la ventana dialog con el nuevo argumento del resultado del filto  

  createCards(filteredCountries);
  showCards(filteredCountries);

}

//Escuchamos el evento change para que ejecute la función de filtro por continente
select.addEventListener('change', filterByContinent);
// Seleccionamos el elemento sortSelect y lo guardamos en la constante orderSelect
const orderSelect = document.getElementById('sortSelect');
//Creamos una función para que muestre los países ordenados
const showCountrySorted = () => {
  //Seleccionamos el valor del orderSelect
  const selectedSort = orderSelect.value
  //Llamamos a la funcion que ordena por area pasandole como argumento la data y el valor del orden seleccionado
  const countrySorted = areaOrder(data.countries, selectedSort)
  //Limpiamos el containerCard
  containerCard.innerHTML = "";
  //Llamamos el createCards y showCards nuevamente con el argumento que ordena los paises por area
  createCards(countrySorted);
  showCards(countrySorted);

}
//Escuchamos el evento change del select del sort y le mandamos a que ejecute la función que muestra los paises ordenados
orderSelect.addEventListener('change', showCountrySorted);

//Creamos un botón que regrese al usuario hacia arriba rápidamente
const buttonUp = document.getElementById("toTop");
window.onscroll = () => {
  buttonUp.classList[
    (document.documentElement.scrollTop > 200) ? "add" : "remove"
  ]("is-visible")

  buttonUp.onclick = () => {
    window.scrollTo({
      top: 0, behavior: "smooth"
    })
  }
};
//Mandamos a que al hacer click en el header, mande a la pantalla de inicio
const refreshClick = document.getElementById('refresh');
refreshClick.addEventListener('click', () => {
  location.reload();
})



//Creamos una función para que nos filtre y ordene a la vez
const filterAndSortCountries = () => {
  //valor del select de continente
  const selectedContinent = select.value;
  //valor del select de sort
  const selectedSort = orderSelect.value;

  // la funcion de filtrar continente con sus argumentos
  const filteredCountries = findByContinent(data.countries, selectedContinent);

  // la funcion de ordenar los países por tamaño con el argumento de que tome la data de los paises que ya estan filtrados por continente
  const sortedCountries = areaOrder(filteredCountries, selectedSort);
  //Vaciamos el containerCard
  containerCard.innerHTML = '';

  //  tarjetas de los países ordenados y filtrados con argumento que une las dos funciones
  createCards(sortedCountries);
  showCards(sortedCountries);
};

//Escuchamos evento change en cada caso 
select.addEventListener('change', filterAndSortCountries);
orderSelect.addEventListener('change', filterAndSortCountries);


















