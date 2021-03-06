const { Observable, pipe } = rxjs
const { map, tap } = rxjs.operators

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
        suscriber.next(dato)
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

// TODO espejar el dato...
let suscriptorEspejarInput = espejarInput().pipe(
  tap(dato => console.log('pipe:', dato)),
  map(dato => dato.split('')),
  map(array => {
    // TODO espejar el arreglo
    return array.reverse();
  }),
  map(array => array.join('')),
)
  .subscribe(
    dato => {
      // a obtener el input espejado, lo agrego al html
      document.querySelector('.output').innerText = dato
    },   //next
    error => console.error(error), //error
    () => console.warn('Observable Input complete ') //complete
  )

setTimeout(() => {
  console.warn('Observable Input desuscripción ')
  suscriptorEspejarInput.unsubscribe()
}, 30000)