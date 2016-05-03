/**
 * Created by heke on 16/3/11.
 */
(function(){
    "use strict";
    angular
        .module('MyKit.homepage',[])
        .controller('homepageController',homepageController);

    homepageController.$injector=['$scope','$state','$http','$q','loginServices','$filter'];
    function homepageController($scope,$state,$http,$q,loginServices,$filter){
        loginServices.islogin();
        loginServices.getUser().then(function(data){
         $scope.user=data;
            console.log($scope.user);
        });
        $scope.left_menu='';
        $scope.clickLink=function(data){
            $scope.left_menu=data;

        };


        $scope.logout=function(){
            var d=$q.defer();
            $http.get('/logout')
                .success(function(data,status){
                    if(data ==='ok') {
                        console.log('front ok');
                        //$state.go('index.mykit.register');
                        $state.go('index.mykit.login');
                        //$location.path('/index/mykit/register');
                    }
                    d.resolve(data);
                })
                .error(function(data,status){
                    d.reject(data);
                });
            return d.promise;
        };
        //事务管理
        $scope.newTodo={
            title:'',
            content:''
        };
        $scope.editTodo={
            title:'',
            content:''
        };
        loginServices.getTodos().then(function(data){
                $scope.todos=data;
                $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
                $scope.completedCount = $scope.todos.length - $scope.remainingCount;
        });
        $scope.changeStatus= function (data) {
            var status = $scope.status=data;
            console.log($scope.status);
            $scope.statusFilter =  (status === 'planed') ?
            { completed: false } :(status === 'completed') ? { completed: true } : {};
        };
         var maskWrap=document.getElementById('mask-wrap');
         var editTodos=document.getElementById('edit-todo');
        var editFriends=document.getElementById('edit-contact');
        var detailFriends=document.getElementById('contact-detail');
        $scope.enterEdit=function(todo){
            $scope.editTodo=angular.copy(todo);
            $scope.todoIndex=$scope.todos.indexOf(todo);
            maskWrap.style.display='block';
            editTodos.style.display='block';
        };

        $scope.updateTodo=function(todo){
            var todo=todo;
            $scope.todos[$scope.todoIndex]=angular.copy(todo);
            $scope.editTodo={
                title:'',
                content:''
            };
            $scope.todoIndex=0;
            editTodos.style.display='none';
            maskWrap.style.display='none';
            return $q(function(resolve,reject){
                $http.post('/updateTodo',todo)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });

        };
        $scope.deleteTodo= function (todo) {
            var todo=todo;
            $scope.todoIndex=$scope.todos.indexOf(todo);
            $scope.todos.splice( $scope.todoIndex,1);
            $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
            $scope.completedCount = $scope.todos.length - $scope.remainingCount;
            $scope.todoIndex=0;
            return $q(function(resolve,reject){
                $http.post('/deleteTodo',todo)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });
        };
        $scope.closeMask=function(event){
            detailFriends.style.display='none';
            editFriends.style.display='none';
            editTodos.style.display='none';
            maskWrap.style.display='none';
            event.stopPropagation();
        };
        $scope.createTodo=function(){
            var d=$q.defer();
            $http.post('/createTodo',$scope.newTodo)
                .success(function(data,status){
                    if(data ==='ok') {
                        loginServices.getTodos().then(function(data){
                            $scope.todos=data;
                            console.log($scope.todos);
                        });
                        $scope.newTodo={
                            title:'',
                            content:''
                        };
                        //$state.go('index.mykit.register');
                        $state.go('index.user.todolist.all');
                        //$location.path('/index/mykit/register');
                    }
                    d.resolve(data);
                })
                .error(function(data,status){
                    d.reject(data);
                });
            return d.promise;
        };
        $scope.toggleCompleted = function (todo) {
            var todo=todo;
            $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
            $scope.completedCount = $scope.todos.length - $scope.remainingCount;
            return $q(function(resolve,reject){
                $http.post('/completeTodo',todo)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });

        };
        //阻止事件冒泡
        $scope.stopProgation=function(e){
            if (e && e.stopPropagation) {//非IE浏览器
                e.stopPropagation();
            }
            else {//IE浏览器
                window.event.cancelBubble = true;
            }
        };

        //通讯录
        $scope.newFriend={
            name:'',
            birth:'',
            tel:'',
            email:'',
            address:'',
            remarks:''
        };
        $scope.editFriend={
            name:'',
            birth:'',
            tel:'',
            email:'',
            address:'',
            remarks:''
        };
        loginServices.getFriends().then(function(data){
            $scope.friends=data;
            $scope.attentionCount = $filter('filter')($scope.friends, { attention: true }).length;
        });
        $scope.addFriends=function(){
            return $q(function(resolve,reject){
                $http.post('/addFriend',$scope.newFriend)
                    .success(function(data,status){
                        if(data==='ok'){
                            loginServices.getFriends().then(function(data){
                                $scope.friends=data;
                            });
                            $state.go('index.user.contactlist.all');
                            $scope.newFriend={
                                name:'',
                                birth:'',
                                tel:'',
                                email:'',
                                address:'',
                                remarks:'',
                            };
                        }
                        resolve(data);
                    })
                    .error(function (data,status) {
                        reject(data);
                    });
            });
        };
        $scope.attentionFriend=function(friend){
            friend.attention=!friend.attention;
            $scope.attentionCount = $filter('filter')($scope.friends, { attention: true }).length;
            return $q(function(resolve,reject){
                $http.post('/attentionFriend',friend)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });
        };
        $scope.deleteFriend=function(friend){
            var friend=friend;
            $scope.friendIndex=$scope.friends.indexOf(friend);
            $scope.friends.splice( $scope.friendIndex,1);
            $scope.attentionCount = $filter('filter')($scope.friends, { attention: true }).length;
           $scope.friendIndex=0;
            return $q(function(resolve,reject){
                $http.post('/deleteFriend',friend)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });
        };
        $scope.updateFriend=function(friend){
            var friend=friend;
            $scope.friends[$scope.friendIndex]=angular.copy(friend);
            $scope.editFriend={
                name:'',
                birth:'',
                tel:'',
                email:'',
                address:'',
                remarks:''
            };
            $scope.friendIndex=0;
            editFriends.style.display='none';
            maskWrap.style.display='none';
            return $q(function(resolve,reject){
                $http.post('/updateFriend',friend)
                    .success(function(data,status){
                        resolve(data);
                    })
                    .error(function(data,status){
                        reject(data);
                    });
            });
        };
        $scope.enterFriend=function(friend){
            $scope.editFriend=angular.copy(friend);
            $scope.friendIndex=$scope.friends.indexOf(friend);
            maskWrap.style.display='block';
            editFriends.style.display='block';
        };
        $scope.detailFriend=function(friend){
            $scope.editFriend=angular.copy(friend);
            maskWrap.style.display='block';
           detailFriends.style.display='block';
        }


    }

})();