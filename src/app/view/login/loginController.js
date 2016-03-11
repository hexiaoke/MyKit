/**
 * Created by heke on 16/3/11.
 */
(function(){
    'use strict';
    angular
        .module('MyKit.login',[])
        .controller('loginController',loginController);
        loginController.$injector=['$scope','$http', '$q','$state','$location'];
        function loginController($scope,$http,$q,$state,$location){
            $scope.user={
                name:'',
                password:''
            };
            //待解决的问题
            $scope.islogin=function(){
                var d=$q.defer();
                $http.get('/islogin',$scope.user)
                    .success(function(data,status){
                        //回头改为响应码
                        if(data ==='ok') {
                            console.log('front ok');
                            //$state.go('index.mykit.register');
                            $state.go('index.container');
                            //$location.path('/index/mykit/register');
                        }
                        if(data ==='no') {
                            console.log('front no');
                            $state.go('index.mykit.login');
                        }
                        d.resolve(data);
                    })
                    .error(function(data,status){
                        d.reject(data);
                    });
                return d.promise;
            };
            $scope.islogin();//暂时的方法,还不知道其他怎么判断是否已经登录
            $scope.login=function(){
                var d=$q.defer();
                $http.post('/login',$scope.user)
                    .success(function(data,status){
                        if(data =='ok') {
                            console.log('front ok');
                            //$state.go('index.mykit.register');
                            $state.go('index.container');
                            //$location.path('/index/mykit/register');
                        }
                        if(data =='no') {
                            console.log('front no');
                            $state.go('index.mykit.register');
                        }
                        d.resolve(data);
                    })
                    .error(function(data,status){
                    d.reject(data);
                });
                return d.promise;
            }
            $scope.check=function(){
                return $scope.login_form.$valid;
            }

        }
})();