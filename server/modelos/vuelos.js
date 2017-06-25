'use strict';

Modelos.vuelos = new Mongo.Collection("vuelos");
Modelos.vuelos_detalle = new Mongo.Collection("vuelos_detalle");
Modelos.reservas = new Mongo.Collection("reservas");

function crearVuelo(informacion) {
  let ciudadOrigen = Modelos.cuidades.findOne({ nombre: informacion.ciudadOrigen });
  let ciudadDestino = Modelos.cuidades.findOne({ nombre: informacion.ciudadDestino });
  let aerolinea = Modelos.aerolinea.findOne({ nombre_comercial: informacion.aerolinea });
  let avion = Modelos.aerolinea.findOne({ nombre_comercial: informacion.placa_avion });

  let vuelo = {
    id_ciudadOri: ciudadOrigen._id,
    id_ciudadDes: ciudadDestino._id,
    id_aerolinea: aerolinea._id,
    fecha_salida: informacion.fecha_salida,
    fecha_llegada: informacion.fecha_llegada,
    estado: 0
  }

  Modelos.vuelos.insert(vuelo, (err, id) => {
    let informacionVuelos_detalles = {
      idVuelo: id,
      primeraClaseAsientos: informacion.primeraClaseAsientos,
      primeraClaseCosto: informacion.primeraClaseCosto,
      turisticaAsientos: informacion.turisticaAsientos,
      turisticaCosto: informacion.turisticaCosto,
      economicaAsientos: informacion.EconomicaAsientos,
      economicaCosto: informacion.EconomicaCosto,
    }
    crearVuelos_detalles(informacionVuelos_detalles);
    console.log("Vuelo cretado");
    return id;
  });

}

function crearVuelos_detalles(informacion) {
  let clases_vuelo = Modelos.clases_vuelo.find().fetch();
  clases_vuelo.forEach((clase) => {
    let vuelo_detalle = {
      id_vuelo: informacion.idVuelo,
      id_clase: clase._id,
    }
    switch (clase) {
      case "Primera Clase":
        vuelo_detalle.cantidadAsientos = informacion.primeraClaseAsientos;
        vuelo_detalle.costo = informacion.primeraClaseCosto;
        vuelo_detalle.asientosDisponibles = informacion.primeraClaseAsientos;
        break;
      case "Turística":
        vuelo_detalle.cantidadAsientos = informacion.turisticaAsientos;
        vuelo_detalle.costo = informacion.turisticaCosto;
        vuelo_detalle.asientosDisponibles = informacion.turisticaAsientos;
        break;
      case "Económica":
        vuelo_detalle.cantidadAsientos = informacion.economicaAsientos;
        vuelo_detalle.costo = informacion.economicaCosto;
        vuelo_detalle.asientosDisponibles = informacion.economicaAsientos;
        break;
    }
    Modelos.vuelos_detalle.insert(vuelo_detalle);
    console.log("Vuelo detalle ", clase.name, "creado");
  });
}

function crearReserva(informacion) {
  let reserva = {
    id_vuelo_detalle: informacion.id_vuelo_detalle,
    id_usuario: informacion.id_usuario,
    fecha_reserva: new Date(),
    estado: 0
  };
  Modelos.reservas.insert(reserva, (err, id) => {
    return {
      idReserva: id,
      idUsuario: informacion.id_usuario
    }
  });
}

function tiquetes(informacion) {
  let tiquete = {
    id_vuelo_detalle: informacion.id_vuelo_detalle,
    id_usuario: informacion.id_usuario,
    asiento: informacion.asiento,
    tipo_documento: informacion.tipo_documento,
    nombres_pasajero: informacion.nombres_pasajero,
    apellidos_pasajero: informacion.apellidos_pasajero
  }
  Modelos.tiquetes.insert(tiquete, (err, id) => {
    return {
      idTiquete: id,
      idUsuario: informacion.id_usuario
    }
  })
}