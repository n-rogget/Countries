import { findByContinent } from '../src/data.js';
import data from '../src/data/countries/countries.js';


describe('findByContinent', () => {
  it('is a function', () => {
    expect(typeof findByContinent).toBe('function');
  });

  it('devuelve el pais "Antarctica" cuando selecciona el continente "Antarctica"', () => {

    expect(findByContinent(data.countries, "Antarctica")[0].name.common).toEqual('Antarctica');
  });
});


/*const countries = {

}*/

/*describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});*/