const operacion = async (num1: number, num2: number, op: string) => {

  const { Suma } = await import('./Suma.js');
  const { Resta } = await import('./Resta.js');
  
  return new Promise<number>((resolve, reject) => {
    if(op === "suma"){
      const e = new Suma(num1, num2);
      resolve(e.resultado());
    } else if (op === "resta") {
      const e = new Resta(num1, num2);
      resolve(e.resultado());
    } else {
      reject("Not a valid operation");
    }
  })
}


const operaciones = () => {
  // Llamada a operacion suma
  operacion(2, 3, "suma").then(result => console.log(result)).catch(e => console.log(e));

  // Llamada a operacion resta
  operacion(7, 3, "resta").then(result => console.log(result)).catch(e => console.log(e));

  // Llamada a operacion con error
  operacion(7, 3, "sumacion").then(result => console.log(result)).catch(e => console.log(e));
}


operaciones();
