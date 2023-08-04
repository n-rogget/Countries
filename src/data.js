
//Función que filtra los paises según lo que se ingrese en el buscador input

export const filterByInput = (paises, inputValue) => {
  const countryFilter = [];
  //Recorremos los países
  for (const country of paises) {
    //Guardamos en una constante los nombre common de los países y los llevamos a minúsculas para compararlos con el valor del input correctamente
    const countryName = country.name.common.toLowerCase();
    //Usamos la condicional que evalúa si el nombre del país contiene la misma letra el valor del input, si es distinto a -1 quiere decir que lo encontró
    if (countryName.indexOf(inputValue) !== -1) {
      //Le agregamos con push el contenido encontrado al nuevo arreglo
      countryFilter.push(country);
    }
  }
  return countryFilter
};
/*-----------------------------------------------------------------------------------------------------------------------*/


//Creamos la función que va a filtrar los paises según el continente seleccionado, recibe dos parámetros, paises y el continente seleccionado
export const findByContinent = (paises, selectedContinent ) => {
  //if para establecer la condición de que si se selecciona la opción continent,  nos devuelva todos los paises como al inicio
  if (selectedContinent === 'continent'){
    return paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
  //Guardamos en una constante el método filter que se aplica a paises (que va a ser toda la data) y va a filtrar country que es nuestro pais resultado para que sean los que incluyan el continente seleccionado
  const filteredCountries = paises.filter(country => country.continents.includes(selectedContinent));
  return filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
};

export const areaOrder = (paises, selectedSort) => {
  if (selectedSort === 'largeToSmall'){
    const orderAreaLarge = paises.sort((c, d) => d.area - c.area);
    return orderAreaLarge;
  }

  if (selectedSort === 'smallToLarge'){
    const orderAreaSmall = paises.sort((c, d) => c.area - d.area);
    return orderAreaSmall;
  } 
  else {
    return paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }

}

export const calculo = (a, b) => {
  return (a/b).toFixed(2)
  }