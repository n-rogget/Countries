import { example, anotherExample } from '../src/data.js';


describe(' testeando funcion createCards', () => {
//it , podemos plantear cada test
//descripcion del test

  it('is a function', () => {
    //expect - la prueba
    //matcher - toBe, toEqual
    expect(typeof example).toBe('function');
  });

  it('returns `creates cards with its content`', () => {
    expect(example()).toBe('example');
  });
});

//COMO DEFINIR O TRAERNOS paises

describe('showCards', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});
