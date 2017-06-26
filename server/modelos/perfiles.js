'use strict';

Modelos.perfiles = new Mongo.Collection("perfiles");

function crearPerfiles(informacion) {
  if (Modelos.perfiles.find().count() === 0) {
    let perfiles = [
      { perfil: "Administrador", eliminado: false },
      { perfil: "Cliente", eliminado: false },
      // { perfil: "Aerolinea", eliminado: false }
    ]
    perfiles.forEach((perfil) => {
      Modelos.perfiles.insert(perfil);
    });
    console.log("perfiles creados");
  }
}

Metodos.crearPerfiles = crearPerfiles;