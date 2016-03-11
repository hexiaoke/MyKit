var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);
var router=function(app){
  app.post('/register', function (req, res) {
    var _user = req.body;
    User.findOne({name: _user.name},  function(err, user) {
      if (err) {
        console.log(err)
      }

      if (user) {
      res.send('same');
      }
      else {
        user = new User(_user);
        user.save(function(err, user) {
          if (err) {
            console.log(err)
          }
        });
        res.send('ok');
      }
    });
  });
  app.post('/login', function (req, res) {
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
      if (err) {
        console.log(err)
      }

      if (!user) {
        console.log('end no user');
        return res.send('no')
      }

      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          req.session.user = user;
          console.log('end ok');
          return res.send('ok');
        }
        else {
          return res.send('no');
        }
      })
    })
  });
  app.get('/islogin',function(req, res) {
    var user = req.session.user;

    if (user) {
      return res.send('ok');
    }
    else {
      return res.send('no');
    }

  });
  app.get('/logout', function(req, res) {
    delete req.session.user;
    //delete app.locals.user

    res.send('ok');
  })
}

module.exports = router;
