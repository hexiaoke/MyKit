/**
 * Created by heke on 16/3/10.
 */
var mongoose = require('mongoose')
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;