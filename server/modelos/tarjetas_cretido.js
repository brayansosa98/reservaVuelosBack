'use strict';

Modelos.tarjetas_cretido = new Mongo.Collection("tarjetas_cretido");

function createTarjetaCredito(informacion) {
  let tarjeta_cretido = {
    id_usuario: informacion.id_usuario,
    id_entidad: informacion.id_entidad,
    numero_tarjeta: informacion.numero_tarjeta,
    estado: 0,
    eliminado: false
  };

  return Modelos.tarjeta_cretido.insert(tarjeta_cretido);
}

Metodos.createTarjetaCredito = createTarjetaCredito;