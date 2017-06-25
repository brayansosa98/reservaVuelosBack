'use strict';

Modelos.aviones = new Mongo.Collection("aviones");

function crearAvion(informacion) {
  let aerolinea = Modelos.findOne({ nombre_comercial: informacion.nombreAerolinea });
  let avion = {
    id_aerolinea: aerolinea._id,
    placa: informacion.placa,
    modelo: informacion.modelo,
    eliminado: false
  };

  return Modelos.aviones.insert(avion);
}

Metodos.crearAvion = crearAvion;