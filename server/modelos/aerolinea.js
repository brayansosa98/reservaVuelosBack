'use strict';

Modelos.aerolineas = new Mongo.Collection("aerolineas");

function creaerAerolinea(informacion) {
  let usuario = Modelos.usaurios.find({ "profile.nombre": informacion.nombre_usuario });
  let aerolinea = {
    id_usuario: usuario._id,
    nit: informacion.nit,
    nombre_comercial: informacion.nombre_comercial,
    direccion: informacion.direccion,
    telefono: informacion.telefono,
    eliminado: false
  };
  return Modelos.aerolineas.insert(areolinea);
}

function obtenerAerolineas(informacion) {
  return Modelos.aerolineas.find().fetch();
}

function guardarAerolineas() {
  
}

Metodos.creaerAerolinea = creaerAerolinea;
Metodos.obtenerAerolineas = obtenerAerolineas;