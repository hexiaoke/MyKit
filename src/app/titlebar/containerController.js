/**
 * Created by heke on 16/3/11.
 */
(function(){
    "use strict";
    angular
        .module('MyKit.container',[])
        .controller('containerController',containerController);

    containerController.$injector=['$scope','$state','$http','$q'];

    function containerController($scope,$state,$http,$q){
        $scope.logout=function(){
            var d=$q.defer();
            $http.get('/logout',$scope.user)
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
        }

})();