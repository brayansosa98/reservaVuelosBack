'use strict';

Utilidades.usuarioLogeado = function () {
  let user = Meteor.user();
  if (!user) {
    throw new Meteor.Error("user not logged");
  }
  return user;
}

Utilidades.contraseñaAleatoria = function () {
  var chars = "abcdefghiklmnopqrstuvwxyz";
  var string_length = 6;
  var randomstring = '';
  var charCount = 0;
  var numCount = 0;

  for (var i = 0; i < string_length; i++) {
    if ((Math.floor(Math.random() * 2) === 0) && numCount < 2 || charCount >= 4) {
      var rnum = Math.floor(Math.random() * 10);
      randomstring += rnum;
      numCount += 1;
    } else {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
      charCount += 1;
    }
  }

  return randomstring;
};

// {username: "brayansosa", email: "brayansosavillalobos@gmail.cm", name: "Brayan", lastName: "Sosa", birthdayDate: new Date()}