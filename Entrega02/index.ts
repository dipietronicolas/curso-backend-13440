const operacion = async (num1: number, num2: number, op: string) => {
  try {
    if (op === "suma") {
      const { Suma } = await import('./Suma');
      const e = new Suma(num1, num2);
      return Promise.resolve(e.resultado());
    } else if (op === "resta") {
      const { Resta } = await import('./Resta');
      const e = new Resta(num1, num2);
      return Promise.resolve(e.resultado());
    } else {
      return "Not a valid operation";
    }
  } catch(e) {
    console.log(e);
  }
}

const operaciones = async () => {
  // Llamada a operacion suma
  console.log(await operacion(2, 3, "suma"));

  // Llamada a operacion resta
  console.log(await operacion(7, 3, "resta"));

  // Llamada a operacion con error
  console.log(await operacion(7, 3, "sumacion"));
}

operaciones();
