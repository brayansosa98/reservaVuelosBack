'use strict';

Modelos.aerolineas = new Mongo.Collection("aerolineas");

function creaerAerolinea(informacion) {
  let aerolinea = {
    nombre_comercial: informacion.nombre_comercial
  };
  return Modelos.aerolineas.insert(aerolinea);
}

function obtenerAerolineas(informacion) {
  return Modelos.aerolineas.find().fetch();
}

function guardarAerolineas() {
  if (Modelos.aerolineas.find().count() < 1) {
    let informacion = [
      {
        nombre: "AVIANCA",
        aviones: ["N707JT", "HK4756"],
        vuelos: [
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Bogotá",
            fecha_salida: "05/07/2017",
            hora_salida: "04:30",
            fecha_llegada: "05/07/2017",
            hora_llegada: "05:45",
            placa_avion: "N707JT",
            primeraAsientos: "15",
            primeraCosto: "800.000",
            turisticaAsientos: "25",
            turisticaCosto: "600.000",
            economicaAsientos: "35",
            economicaCosto: "400.000"
          },
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Cali",
            fecha_salida: "29/06/2017",
            hora_salida: "12:00",
            fecha_llegada: "29/06/2017",
            hora_llegada: "15:00",
            placa_avion: "HK4756",
            primeraAsientos: "15",
            primeraCosto: "700.000",
            turisticaAsientos: "25",
            turisticaCosto: "500.000",
            economicaAsientos: "35",
            economicaCosto: "300.000"
          },
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Cartagena de Indias",
            fecha_salida: "30/06/2017",
            hora_salida: "10:00",
            fecha_llegada: "30/06/2017",
            hora_llegada: "12:00",
            placa_avion: "N707JT",
            primeraAsientos: "15",
            primeraCosto: "700.000",
            turisticaAsientos: "25",
            turisticaCosto: "500.000",
            economicaAsientos: "35",
            economicaCosto: "300.000"
          }
        ]
      },
      {
        nombre: "VIVACOLOMBIA",
        aviones: ["N789JI", "N8976U"],
        vuelos: [
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Bogotá",
            fecha_salida: "30/06/2017",
            hora_salida: "09:00",
            fecha_llegada: "30/06/2017",
            hora_llegada: "12:00",
            placa_avion: "N789JI",
            primeraAsientos: "10",
            primeraCosto: "230.000",
            turisticaAsientos: "18",
            turisticaCosto: "180.000",
            economicaAsientos: "25",
            economicaCosto: "100.000"
          },
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Barranquilla",
            fecha_salida: "01/07/2017",
            hora_salida: "14:00",
            fecha_llegada: "01/07/2017",
            hora_llegada: "16:00",
            placa_avion: "N8976U",
            primeraAsientos: "10",
            primeraCosto: "280.000",
            turisticaAsientos: "18",
            turisticaCosto: "200.000",
            economicaAsientos: "25",
            economicaCosto: "130.000"
          }
        ]
      },
      {

        nombre: "LATAM AIRLINES",
        aviones: ["TJ987U", "UN897T"],
        vuelos: [
          {
            ciudadOrigen: "Medellín",
            ciudadDestino: "Bogotá",
            fecha_salida: "30/06/2017",
            hora_salida: "12:00",
            fecha_llegada: "30/06/2017",
            hora_llegada: "01:00",
            placa_avion: "TJ987U",
            primeraAsientos: "10",
            primeraCosto: "250.000",
            turisticaAsientos: "15",
            turisticaCosto: "300.000",
            economicaAsientos: "20",
            economicaCosto: "143.000"
          },
          {
            ciudadOrigen: "Cali",
            ciudadDestino: "Bogotá",
            fecha_salida: "03/07/2017",
            hora_salida: "20:00",
            fecha_llegada: "03/07/2017",
            hora_llegada: "22:00",
            placa_avion: "UN897T",
            primeraAsientos: "13",
            primeraCosto: "900.000",
            turisticaAsientos: "20",
            turisticaCosto: "500.000",
            economicaAsientos: "28",
            economicaCosto: "300.000"
          },
          {
            ciudadOrigen: "Cartagena de Indias",
            ciudadDestino: "Medellín",
            fecha_salida: "28/07/2017",
            hora_salida: "15:40",
            fecha_llegada: "28/07/2017",
            hora_llegada: "2:40",
            placa_avion: "UN897T",
            primeraAsientos: "13",
            primeraCosto: "950.000",
            turisticaAsientos: "20",
            turisticaCosto: "550.000",
            economicaAsientos: "28",
            economicaCosto: "350.000"
          }
        ]
      }
    ];

    console.log(informacion);

    informacion.forEach((aerolinea) => {
      let auxAero = {
        nombre_comercial: aerolinea.nombre,
      }
      let idAerolinea = creaerAerolinea(auxAero);
      console.log("aerolinea creada", aerolinea.nombre);
      aerolinea.aviones.forEach((avion) => {
        let auxAvion = {
          id_aerolinea: idAerolinea,
          placa: avion,
        };
        let idAvion = Metodos.crearAvion(auxAvion);
        console.log("Avion creado", idAvion);
        aerolinea.vuelos.forEach((vuelo) => {
          if (vuelo.placa_avion === avion) {
            let auxVuelo = {
              ciudadOrigen: vuelo.ciudadOrigen,
              ciudadDestino: vuelo.ciudadDestino,
              aerolinea: idAerolinea,
              avion: idAvion,
              fecha_salida: vuelo.fecha_salida,
              hora_salida: vuelo.hora_salida,
              fecha_llegada: vuelo.fecha_llegada,
              hora_llegada: vuelo.hora_llegada,
              primeraClaseAsientos: vuelo.primeraAsientos,
              primeraClaseCosto: vuelo.primeraCosto,
              turisticaAsientos: vuelo.turisticaAsientos,
              turisticaCosto: vuelo.turisticaCosto,
              EconomicaAsientos: vuelo.economicaAsientos,
              EconomicaCosto: vuelo.economicaCosto,
            }
            let idVuelo = Metodos.crearVuelo(auxVuelo);
            console.log("vuelo creado con id:", idVuelo);
          }
        });
      });
    });
  }
}

Metodos.creaerAerolinea = creaerAerolinea;
Metodos.obtenerAerolineas = obtenerAerolineas;
Metodos.guardarAerolineas = guardarAerolineas;