'use strict';

Models.users = Meteor.users;

function createUser(data) {
  // let loggedUser = Utils.isLoggedUser();
  let userId;

  var tempPassword = data.password ? data.password : Utils.getRamdonPassword();

  let user = {
    username: data.username,
    email: data.email,
    password: tempPassword,
    profile: {
      name: data.name,
      lastName: data.lastName,
      birthdayDate: data.birthdayDate,
      isRemove: false,
      validPassword: false
    }
  }

  // { username: "brayansosa98", email: "brayan_sosa23151@elpoli.edu.co", name: "Brayan", lastName: "Sosa", birthdayDate: new Date() }


  userId = Accounts.createUser(user);

  return {
    status: 1,
    message: 'user created',
    operation: 1,
    id: userId
  };
}

function whoIsLogged() {
  let user = Utils.isLoggedUser();
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

Methods.createUserV = createUser;
Methods.whoIsLogged = whoIsLogged;