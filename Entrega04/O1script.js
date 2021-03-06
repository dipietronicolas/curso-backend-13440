const { Observable, pipe } = rxjs
const { map } = rxjs.operators

function espejarInput() {
  return new Observable(suscriber => {

    // funcion que se ejecutara cuando detecte el evento "input"
    function ateEventInput() {
      let dato = document.querySelector('input').value

      if (dato == 'error') {
        suscriber.error('Error de entrada')
      }
      else if (dato == 'complete') {
        suscriber.complete()
      }
      else {
        // TODO espejar el string (dato) usando array.reverse()
        let datoEspejado = dato.split("").reverse().join("");
        suscriber.next(datoEspejado);
      }
    }

    // agrego el listener pasandole el evento y la funcion a ejecutar
    document.querySelector('input').addEventListener('input', ateEventInput)

    return () => {
      // elimino el listener y limpio el input
      document.querySelector('input').removeEventListener('input', ateEventInput)
      document.querySelector('input').disabled = true
      document.querySelector('.output').innerText = ''
      console.warn('Observable Input return')
    }
  })
}

// a obtener el input espejado, lo agrego al html
let suscriptorEspejarInput = espejarInput()
  .subscribe(
    dato => {
      //console.log('suscribe ->',dato)
      document.querySelector('.output').innerText = dato
    },   //next
    error => console.error(error), //error
    () => console.warn('Observable Input complete ') //complete
  )

setTimeout(() => {
  console.warn('Observable Input desuscripción ')
  suscriptorEspejarInput.unsubscribe()
}, 30000)
