/**
 * Created by heke on 16/3/11.
 */
(function(){
    'use strict';
    angular
        .module('MyKit.login',[])
        .controller('loginController',loginController);
        loginController.$injector=['$scope','$http', '$q','$state','loginServices'];
        function loginController($scope,$http,$q,$state,loginServices){
            $scope.user={
                name:'',
                password:''
            };
            loginServices.islogin();
            $scope.login=function(){
                var d=$q.defer();
                $http.post('/login',$scope.user)
                    .success(function(data,status){
                        if(data =='ok') {
                            console.log('front ok');
                            //$state.go('index.mykit.register');
                            $state.go('index.user');
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