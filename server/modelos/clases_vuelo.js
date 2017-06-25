'use strict';

Modelos.clases_vuelo = new Mongo.Collection("clases_vuelo");

function createClasesVuelo() {

  if (Modelos.clases_vuelo.find().count() === 0) {
    let clases_vuelo = [
      { name: "Primera Clase", eliminado: false },
      { name: "Turística", eliminado: false },
      { name: "Económica", eliminado: false }
    ];

    clases_vuelo.forEach((clase) => {
      Modelos.clases_vuelo.insert(clase);
    }, this);

    console.log("Clases de vuelo creadas");
  }

}