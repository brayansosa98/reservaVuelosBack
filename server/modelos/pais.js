'use strict';

Modelos.paises = new Mongo.Collection("paises");
Modelos.departamentos = new Mongo.Collection("departamentos");
Modelos.ciudades = new Mongo.Collection("ciudades");

function crearPaisesDepartamentosCiudades() {
  if (Modelos.ciudades.find().count() === 0) {
    let ciudades = [
      "Cartagena de Indias",
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
    ]

    ciudades.forEach((ciudad) => {
      let ciu = {
        nombre: ciudad,
        codigo: ""
      }
      Modelos.ciudades.insert(ciu);
    });
    console.log("ciudades creadas");
  }
}

function obtenerCiudades() {
  return Modelos.ciudades.find().fetch();
}

Metodos.crearPaisesDepartamentosCiudades = crearPaisesDepartamentosCiudades;
Metodos.obtenerCiudades = obtenerCiudades;