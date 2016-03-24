var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);
var TodoSchema=require('../schemas/todos');
var Todo=mongoose.model('Todo',TodoSchema);
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
      return res.sendStatus(200)
    }
    else {
      return res.send('no');
    }

  });
  app.get('/getTodos',function(req,res){
    var id=req.session.user._id;
    Todo.find({user_id:id},function(err,docs){
      if(docs){
        res.send(docs);
      }
      else {
        res.send('nothing');
      }
    });
  });
  app.get('/logout', function(req, res) {
    delete req.session.user;
    //delete app.locals.user
    res.send('ok');
  });
  app.post('/createTodo',function(req,res){
    var todo=new Todo(req.body);
    todo.user_id=req.session.user._id;
    todo.save(function(err,user){
      if(err){
        console.log(err);
      }
    });
    res.send('ok');
  });
 app.post('/completeTodo',function(req,res){
   var todo=req.body;
   Todo.update({_id:todo._id},{$set:{completed:todo.completed}},function(err){
   if (err){
     console.log(err);
   }
     else {
     console.log('ok');
   }
   });

 });
};


module.exports = router;
