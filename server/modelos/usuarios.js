'use strict';

Modelos.usuarios = Meteor.users;

function crearUsuario(informacion) {
  let usuarioLogeado = Utilidades.usuarioLogeado();
  let userId;

  var contraseñaTemporal = informacion.password ? informacion.password : Utilidades.contraseñaAleatoria();

  let usuario = {
    username: informacion.username,
    email: informacion.email,
    password: contraseñaTemporal,
    profile: {
      id_perfil: informacion.profile.id_perfil,
      id_tipodoc: informacion.profile.id_tipodoc,
      documento: informacion.profile.documento,
      primerNombre: informacion.profile.primerNombre,
      segundoNombre: informacion.profile.segundoNombre,
      primerApellido: informacion.profile.primerApellido,
      segundoApellido: informacion.profile.segundoApellido,
      fecha_nacimiento: informacion.profile.fecha_nacimiento,
      eliminado: false
    }
  }
  // { username: "brayansosa98", email: "brayan_sosa23151@elpoli.edu.co", name: "Brayan", lastName: "Sosa", birthdayDate: new Date() }

  userId = Accounts.createUser(usuario);

  return {
    estado: 1,
    mensaje: 'usuario creado',
    operacion: 1,
    id_usuario: userId
  };
}

function usuarioLogeado() {
  let user = Utilidades.usuarioLogeado();
  let result = {
    status: 0
  }
  if (user) {
    if (user.profile.status === false) {
      result.status = 2;
    } else {
      result = {
        status: 1,
        user: user
      }
    }
  }

  return result;
}

Metodos.crearUsuario = crearUsuario;
Metodos.usuarioLogeado = usuarioLogeado;