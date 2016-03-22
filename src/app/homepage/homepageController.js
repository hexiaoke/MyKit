/**
 * Created by heke on 16/3/11.
 */
(function(){
    "use strict";
    angular
        .module('MyKit.homepage',[])
        .controller('homepageController',homepageController);

    homepageController.$injector=['$scope','$state','$http','$q','loginServices'];
    function homepageController($scope,$state,$http,$q,loginServices){
        loginServices.islogin();
        $scope.left_menu='';
        $scope.clickLink=function(data){
            console.log(data);
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
        $scope.createTodo=function(){
            var d=$q.defer();
            $http.post('/createTodo',$scope.newTodo)
                .success(function(data,status){
                    if(data ==='ok') {
                        console.log('front ok');
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
        }

})();