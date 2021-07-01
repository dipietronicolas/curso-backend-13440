console.log("Comienza el archivo hecho con funcion constructora");
function Usuario(nombre, apellido, libros, mascotas){
  this.nombre = nombre;
  this.apellido = apellido;
  this.libros = libros;
  this.mascotas = mascotas;
}

Usuario.prototype.getFullName = function(){
  return `${this.nombre} ${this.apellido}`;
}

Usuario.prototype.addMascota = function(nombre){
  this.mascotas.push(nombre);
}

Usuario.prototype.getMascotas = function(){
  return this.mascotas.length;
}

Usuario.prototype.addBook = function(nombre, autor){
  this.libros.push({ nombre, autor })
}

Usuario.prototype.getBooks = function(){
  return this.libros.map(libro => libro.nombre)
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
usuario.addMascota('firulais');
console.log(usuario.getMascotas());
usuario.addBook("El señor de los anillos", "Tolkien");
console.log(usuario.getBooks());
