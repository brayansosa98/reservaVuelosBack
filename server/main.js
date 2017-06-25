import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.methods(Metodos);
  Metodos.crearPerfiles();
  Metodos.crearPaisesDepartamentosCiudades();
  Metodos.creacionTiposDocumento();
  Metodos.createEntidadesTcredito();
  Accounts.removeDefaultRateLimit();
});