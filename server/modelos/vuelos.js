'use strict';

Modelos.vuelos = new Mongo.Collection("vuelos");
Modelos.vuelos_detalle = new Mongo.Collection("vuelos_detalle");
Modelos.reservas = new Mongo.Collection("reservas");

function crearVuelo(informacion) {
  let ciudadOrigen = Modelos.ciudades.findOne({ nombre: informacion.ciudadOrigen });
  let ciudadDestino = Modelos.ciudades.findOne({ nombre: informacion.ciudadDestino });
  let vuelo = {
    id_ciudadOri: ciudadOrigen._id,
    id_ciudadDes: ciudadDestino._id,
    id_aerolinea: informacion.aerolinea,
    id_avion: informacion.avion,
    fecha_salida: informacion.fecha_salida,
    hora_salida: informacion.hora_salida,
    fecha_llegada: informacion.fecha_llegada,
    hora_llegada: informacion.hora_llegada,
    estado: 0
  }

  let idVuelo = Modelos.vuelos.insert(vuelo);
  let informacionVuelos_detalles = {
    idVuelo: idVuelo,
    primeraClaseAsientos: informacion.primeraClaseAsientos,
    primeraClaseCosto: informacion.primeraClaseCosto,
    turisticaAsientos: informacion.turisticaAsientos,
    turisticaCosto: informacion.turisticaCosto,
    economicaAsientos: informacion.EconomicaAsientos,
    economicaCosto: informacion.EconomicaCosto,
  }
  crearVuelos_detalles(informacionVuelos_detalles);
  console.log("Vuelo cretado");
  return idVuelo;

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
    id_vuelo: informacion.id_vuelo,
    estado: 0
  };

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  reserva.fecha_reserva = day + "/" + month + "/" + year;

  let idReserva = Modelos.reservas.insert(reserva);
  return {
    idReserva: idReserva,
    idUsuario: informacion.id_usuario
  }
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

function obtenerVuelos() {
  let vuelos = Modelos.vuelos.find().fetch();

  vuelos.forEach((vuelo) => {
    vuelo.ciudadOrigen = Modelos.ciudades.findOne(vuelo.id_ciudadOri);
    vuelo.ciudadDestino = Modelos.ciudades.findOne(vuelo.id_ciudadDes);
    vuelo.aerolinea = Modelos.aerolineas.findOne(vuelo.id_aerolinea);
    vuelo.avion = Modelos.aviones.findOne(vuelo.id_avion);
  });

  return vuelos;
}

function obtenerVueloDetalles(data) {
  let vuelo = Modelos.vuelos.findOne(data.id_vuelo);
  if (vuelo) {
    vuelo.ciudadOrigen = Modelos.ciudades.findOne(vuelo.id_ciudadOri);
    vuelo.ciudadDestino = Modelos.ciudades.findOne(vuelo.id_ciudadDes);
    vuelo.aerolinea = Modelos.aerolineas.findOne(vuelo.id_aerolinea);
    vuelo.avion = Modelos.aviones.findOne(vuelo.id_avion);
  }
  let find = {
    id_vuelo: data.id_vuelo
  }
  let clases = Modelos.vuelos_detalle.find(find).fetch();
  clases.forEach((clase) => {
    clase.name = Modelos.clases_vuelo.findOne(clase.id_clase).name;
  });
  let resul = {
    vuelo: vuelo,
    vuelos_detalle: clases
  }
  return resul;
}

function buscarVuelosFiltro(data) {
  let find = {
    id_ciudadOri: data.origen,
    id_ciudadDes: data.destino
  }

  if (data.fecha) {
    find.fecha_salida = data.fecha
  }

  let vuelos = Modelos.vuelos.find(find).fetch();

  vuelos.forEach((vuelo) => {
    vuelo.ciudadOrigen = Modelos.ciudades.findOne(vuelo.id_ciudadOri);
    vuelo.ciudadDestino = Modelos.ciudades.findOne(vuelo.id_ciudadDes);
    vuelo.aerolinea = Modelos.aerolineas.findOne(vuelo.id_aerolinea);
    vuelo.avion = Modelos.aviones.findOne(vuelo.id_avion);
  });

  return vuelos;
}

function obtenerReservas(data) {
  let find = {
    "id_usuario": data.idUsuario
  }
  let vuelos = Modelos.vuelos.find().fetch();
  let vuelos_u = [];
  vuelos.forEach((vuelo) => {
    vuelo.ciudadOrigen = Modelos.ciudades.findOne(vuelo.id_ciudadOri);
    vuelo.ciudadDestino = Modelos.ciudades.findOne(vuelo.id_ciudadDes);
    vuelo.aerolinea = Modelos.aerolineas.findOne(vuelo.id_aerolinea);
    vuelo.avion = Modelos.aviones.findOne(vuelo.id_avion);
    let auxVuelo = {
      vuelo: vuelo,
      reservas: []
    };
    let vuelosDetalles = Modelos.vuelos_detalle.find({ id_vuelo: vuelo._id }).fetch();
    vuelosDetalles.forEach((vueloDetalle) => {
      find["id_vuelo_detalle"] = vueloDetalle._id;
      find["id_vuelo"] = vuelo._id;
      let reservas = Modelos.reservas.find(find).fetch();
      if (reservas.length > 0) {
        let nameClase = Modelos.clases_vuelo.findOne(vueloDetalle.id_clase).name;
        let auxReserva = {
          clase: nameClase,
          reservas: reservas
        }
        auxVuelo.reservas.push(auxReserva);
      }
    });
    if (auxVuelo.reservas.length > 0) {
      vuelos_u.push(auxVuelo);
    }
  });

  return vuelos_u;
}

function cancelarReserva(idReserva) {
  let find = {
    _id: idReserva
  }

  let updated = {
    $set: {
      "estado": 2
    }
  }

  Modelos.reservas.update(find, updated);
}

Metodos.crearVuelo = crearVuelo;
Metodos.obtenerVuelos = obtenerVuelos;
Metodos.obtenerVueloDetalles = obtenerVueloDetalles;
Metodos.buscarVuelosFiltro = buscarVuelosFiltro;
Metodos.crearReserva = crearReserva;
Metodos.obtenerReservas = obtenerReservas;
Metodos.cancelarReserva = cancelarReserva;



