'use strict';

Modelos.entidades_Tcredito = new Mongo.Collection("entidades_Tcredito");

function createEntidadesTcredito() {
  if (Modelos.entidades_Tcredito.find().count() === 0) {
    let entidades = [
      { entidad: "Visa" },
      { entidad: "American Express" },
      { entidad: "MasterCard" }
    ];
    entidades.forEach((entidad) => {
      Modelos.entidades_Tcredito.insert(entidad);
    });
    console.log("Entidades tarjetas de credito creadas");
  }
}

Metodos.createEntidadesTcredito = createEntidadesTcredito;