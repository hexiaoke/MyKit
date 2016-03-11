/**
 * Created by heke on 16/3/9.
 */
(function(){
    "use strict";
    angular
        .module('MyKit.register',[])
        .controller('registerController',registerController);
        registerController.$injector=['$scope','$http', '$q','$state'];
        function registerController($scope,$http,$q,$state){
            $scope.signup = {
                name:'',
                password:'',
                email:'',
                repeatpassword:''
            };
            $scope.register=function(){
                var d=$q.defer();
                $http.post('/register',$scope.signup)
                    .success(function(data,status){
                        d.resolve(data);
                        if(data ==='ok') {
                            $state.go('index.mykit.login');
                        }
                    }).error(function(data,status){
                    d.reject(data);
                });
                return d.promise;
            }
            $scope.check=function(){
                return $scope.signup_form.$valid&&($scope.signup.password==$scope.signup.repeatPassword);
            }
        }
})();