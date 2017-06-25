import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.methods(Methods);
  Accounts.removeDefaultRateLimit();
});