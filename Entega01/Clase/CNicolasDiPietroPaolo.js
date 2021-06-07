console.log("Comienza el archivo hecho con clase");
class Usuario{
  constructor(nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName(){
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(nombre){
    this.mascotas.push(nombre);
  }

  getMascotas(){
    return this.mascotas.length;
  }

  addBook(nombre, autor){
    this.libros.push({ nombre, autor })
  }

  getBooks(){
    return this.libros.map(libro => libro.nombre)
  }
}

const usuario = new Usuario(
  "Nicolas", 
  "Di Pietro Paolo", 
  [{
    nombre: 'harry potter',
    autor: 'JK Rowling'
  }], 
  ['bobby']
);

console.log(usuario.getFullName());
usuario.addMascota('rocky');
console.log(usuario.getMascotas());
usuario.addBook("El mundo de Sofia", "Jostein Gaarder");
console.log(usuario.getBooks());