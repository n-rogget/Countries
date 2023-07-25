//import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/countries/countries.js';
// import data from './data/rickandmorty/rickandmorty.js';

console.log(data);

//const primerPais = data[][0];
//console.log(primerPais["name"]["common"]);

const nombresPaises = [];
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

console.log(banderasPaises);