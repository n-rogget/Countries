
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
  //console.log(countryFilter);
  return countryFilter
};

export const findByContinent = (paises, selectedContinent ) => {
  //if para que cotinent nos devuelva todos los paises
  if (selectedContinent === 'continent'){
    return paises
  }
  const filteredCountries = paises.filter(country => country.continents.includes(selectedContinent));
  return filteredCountries
};