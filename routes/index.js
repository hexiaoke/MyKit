var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);
var TodoSchema=require('../schemas/todos');
var Todo=mongoose.model('Todo',TodoSchema);
var FriendSchema=require('../schemas/friend');
var Friend=mongoose.model('Friend',FriendSchema);
var MoneySchema=require('../schemas/money');
var Money=mongoose.model('Money',MoneySchema);
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
  app.get('/getUser',function(req, res) {
    var id = req.session.user._id;
    User.findOne({_id: id}, function (err, user) {
      if (err) {
        console.log(err);
      }

      if (!user) {
        console.log('end no user');
        return res.send('no');
      }
      else{
        return res.send(user);
      }
    });

  });
  app.get('/logout', function(req, res) {
    delete req.session.user;
    //delete app.locals.user
    res.send('ok');
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
  app.get('/getMoney',function(req,res){
    var id=req.session.user._id;
    Money.find({user_id:id},null,{sort: ['sortDate']},function(err,docs){
      if(docs){
        res.send(docs);
        console.log(docs);
      }
      else {
        res.send('nothing');
      }
    });
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
  app.post('/addMoney',function(req,res){
    var money=new Money(req.body);
    money.user_id=req.session.user._id;
    money.save(function(err){
      if(err){
        console.log(err);
      }
    });
    res.send('ok');
  });
  app.post('/addFriend',function(req,res){
    var friend=new Friend(req.body);
    friend.user_id=req.session.user._id;
    friend.save(function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log('add friend success');
      }
    });
    res.send('ok');
  });
  app.get('/getFriends',function(req,res){
    var id=req.session.user._id;
    Friend.find({user_id:id},function(err,docs){
      if(docs){
        res.send(docs);
      }
      else {
        res.send('nothing');
      }
    });
  });
  app.post('/attentionFriend',function(req,res){
    var friend=req.body;
    Friend.update({_id:friend._id},{$set:{attention:friend.attention}},function(err){
      if (err){
        console.log(err);
      }
      else {
        console.log('attention ok');
      }
    });
  });
  app.post('/deleteFriend',function(req,res){
    var friend=req.body;
    Friend.remove({_id:friend._id},function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

  });
  app.post('/updateFriend',function(req,res){
    var friend=req.body;
    Friend.update({_id:friend._id},friend,function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

  });
  app.post('/updateMoney',function(req,res){
    var money=req.body;
    Money.update({_id:money._id},money,function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

  });
  app.post('/deleteMoney',function(req,res){
    var money=req.body;
    Money.remove({_id:money._id},function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

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
  app.post('/updateTodo',function(req,res){
    var todo=req.body;
    Todo.update({_id:todo._id},todo,function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

  });
  app.post('/deleteTodo',function(req,res){
    var todo=req.body;
    Todo.remove({_id:todo._id},function(err){
      if (err){
        console.log(err);
      }
      else {
        res.send('ok');
      }
    });

  });
};


module.exports = router;
