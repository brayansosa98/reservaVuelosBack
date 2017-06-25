'use strict';

Modelos.aerolineas = new Mongo.Collection("aerolineas");

function createTarjetaCredito(informacion) {
  let aerolinea = {
    nit: informacion.nit,
    nombre_comercial: informacion.nombre_comercial,
    direccion: informacion.direccion,
    telefono: informacion.telefono,
    eliminado: false
  };

  return Modelos.aerolineas.insert(areolinea);
}

Metodos.createTarjetaCredito = createTarjetaCredito;