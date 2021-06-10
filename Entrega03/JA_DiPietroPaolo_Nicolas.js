// Strings a leer
const texto01 = "me compre una cajita feliz";
const texto02 = "me gusta el curso de backend";
const texto03 = "hello moto";
// Funcion que se ejecuta al final
const terminar = () => console.log("Proceso completo.");
// Funcion que hace todo el proceso
const miFuncion = (texto, time = 1000, callback) => {
  const arr_texto = texto.split(' ');

  const muestreo_diferido = () => {
    console.log(arr_texto.shift());  
    if(arr_texto.length === 0){
      clearInterval(x);
      callback && callback();
    }
  }

  const x = setInterval(muestreo_diferido, time);
}

const llamadas = () => {
  // callback hell
  miFuncion(texto01, undefined, () => {
    miFuncion(texto02, 500, () => {
      miFuncion(texto03, 250, terminar);
    });
  });
}

llamadas();

