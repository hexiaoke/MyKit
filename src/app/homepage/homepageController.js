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
            $scope.statusFilter =  (status === 'planed') ?
            { completed: false } :(status === 'completed') ? { completed: true } : {};
        };
         var maskWrap=document.getElementById('mask-wrap');
        $scope.enterEdit=function(todo){
            $scope.editTodo=angular.copy(todo);
            $scope.todoIndex=$scope.todos.indexOf(todo);
            maskWrap.style.display='block';
        };
        $scope.updateTodo=function(todo){
            var todo=todo;
            $scope.todos[$scope.todoIndex]=angular.copy(todo);
            $scope.editTodo={
                title:'',
                content:''
            };
            $scope.todoIndex=0;
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
        $scope.closeMask=function(){
            maskWrap.style.display='none';
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

    }

})();