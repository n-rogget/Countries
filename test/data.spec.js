import { findByContinent, areaOrder } from '../src/data.js';
import data from '../src/data/countries/countries.js';


describe('findByContinent', () => {
  it('is a function', () => {
    expect(typeof findByContinent).toBe('function');
  });

  it('devuelve el pais "Antarctica" cuando selecciona el continente "Antarctica"', () => {

    expect(findByContinent(data.countries, "Antarctica")[0].name.common).toEqual('Antarctica');
  });
});


describe('Ordenar por área', () => {
  it('is a function', () => {
    expect(typeof areaOrder).toBe('function');
  });

  it('devuelve el pais "Russia" cuando selecciona el sort by area Largest to smallest', () => {
    expect(areaOrder(data.countries, "largeToSmall")[0].name.common).toEqual('Russia');
  });
});