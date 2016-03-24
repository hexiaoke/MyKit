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

        },
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
        loginServices.getTodos().then(function(data){
                $scope.todos=data;
                $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
                $scope.completedCount = $scope.todos.length - $scope.remainingCount;
        });


        $scope.changeStatus= function (data) {
            console.log(data);
            var status = $scope.status=data;
            $scope.statusFilter =  (status === 'planed') ?
            { completed: false } :(status === 'completed') ? { completed: true } : {};
        },
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
            console.log(todo);
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