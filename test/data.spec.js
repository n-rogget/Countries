import { filterByInput, anotherExample } from '../src/data.js';


describe('filterByContinent', () => {
  it('is a function', () => {
    expect(typeof filterByInput).toBe('function');
  });

  it('filters countries by continent', () => {
    expect(filterByInput(paises, "Antarctica")[0].name.common).toBe('Antarctica');
  });
});


describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});