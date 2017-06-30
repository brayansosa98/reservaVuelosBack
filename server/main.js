import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.methods(Metodos);
  if (Modelos.usuarios.find().count() === 0) {
    let admin = {
      email: "admin_vuelos@elpoli.edu.co",
      password: "123",
      profile: {
        documento: "12849",
        id_tipodoc: "e8KRZ8sFKAbeQNB5w",
        primerApellido: "vuelos",
        primerNombre: "Admin"
      }
    }
    Metodos.crearUsuario(admin);
  }
  Metodos.crearPerfiles();
  Metodos.createClasesVuelo();
  Metodos.crearPaisesDepartamentosCiudades();
  Metodos.creacionTiposDocumento();
  Metodos.createEntidadesTcredito();
  Metodos.guardarAerolineas();
  Accounts.removeDefaultRateLimit();
});