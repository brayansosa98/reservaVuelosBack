'use strict';

Modelos.aviones = new Mongo.Collection("aviones");

function crearAvion(informacion) {
  let avion = {
    id_aerolinea: informacion.id_aerolinea,
    placa: informacion.placa,
    eliminado: false
  };

  return Modelos.aviones.insert(avion);
}

function obtenerAbionesPorAerolinea(informacion) {
  return Modelos.aviones.find({ id_aerolinea: informacion.id_aerolinea }).fetch();
}

Metodos.crearAvion = crearAvion;
Metodos.obtenerAerolineas = obtenerAbionesPorAerolinea;