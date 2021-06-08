const operacion = (num1: number, num2: number, op: string) => {
  return new Promise<number>((resolve, reject) => {
    if(op === "suma"){
      resolve(num1 + num2);
    } else if (op === "resta") {
      resolve(num1 - num2);
    } else {
      reject("Not a valid operation");
    }
  })
}

const operaciones = () => {
  operacion(2, 3, "suma").then(result => console.log(result)).catch(e => console.log(e));
  
  operacion(7, 3, "resta").then(result => console.log(result)).catch(e => console.log(e));
  
}
operaciones();
