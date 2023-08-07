import { findByContinent, areaOrder, filterByInput, calculo } from '../src/data.js';
import data from '../src/data/countries/countries.js';


describe('findByContinent', () => {
  it('is a function', () => {
    expect(typeof findByContinent).toBe('function');
  });

  it('devuelve el pais "Antarctica" cuando selecciona el continente "Antarctica"', () => {
    expect(findByContinent(data.countries, "Antarctica")[0].name.common).toEqual('Antarctica');
  });

  it('devuelve el pais "Afghanistan" cuando selecciona "Continents"', () => {
    expect(findByContinent(data.countries, "continent")[0].name.common).toEqual('Afghanistan');
  });

  
});


describe('Ordenar por área', () => {
  it('is a function', () => {
    expect(typeof areaOrder).toBe('function');
  });

  it('devuelve el pais "Russia" cuando selecciona el sort by area Largest - smallest', () => {
    expect(areaOrder(data.countries, "largeToSmall")[0].name.common).toEqual('Russia');
  });

  it('devuelve el pais "Svalbard and Jan Mayen" cuando selecciona el sort by area Smallest - Largest', () => {
    expect(areaOrder(data.countries, "smallToLarge")[0].name.common).toEqual('Svalbard and Jan Mayen');
  });
  it('devuelve el pais "Afghanistan" cuando selecciona el sort by area', () => {
    expect(areaOrder(data.countries, "sort")[0].name.common).toEqual('Afghanistan');
  });

});

describe('Buscar en input', () => {
  it('is a function', () => {
    expect(typeof filterByInput).toBe('function');
  });

  it('devuelve el pais "Chad" de primero cuando escribimos ch', () => {
    expect(filterByInput(data.countries, "ch")[0].name.common).toEqual('Chad');
  });
})

describe('calcular población por área', () => {
  it('is a function', () => {
    expect(typeof calculo).toBe('function');
  });

  it('devuelve el calculo de population/area al abrir el dialog', () => {
    expect(calculo(data.countries[0].population, data.countries[0].area)).toBe('61.66');
  });
})
