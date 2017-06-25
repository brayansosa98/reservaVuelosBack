'use strict';

Modelos.tiposDocumento = new Mongo.Collection("tipos_documento");

function creacionTiposDocumento() {
  if (Modelos.tiposDocumento.find().count() === 0) {
    let tipos_documento = [
      { tipo: "Cédula de ciudadanía" },
      { tipo: "Cédula de extranjería" },
      { tipo: "Registro civil de nacimiento" },
      { tipo: "Tarjeta identidad" },
      { tipo: "NIT" }
    ];

    tipos_documento.forEach((documento) => {
      Modelos.tiposDocumento.insert(documento);
    });

    console.log("Tipos de documento creados");
  }
}

Metodos.creacionTiposDocumento = creacionTiposDocumento;
