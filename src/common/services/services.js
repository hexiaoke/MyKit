/**
 * Created by heke on 16/3/14.
 */
(function(){
    'use strict';
    angular
        .module('MyKit.services',[])
        .factory('loginServices',loginServices);
    loginServices.$injector=['$http', '$q','$state'];
    function loginServices($http,$q,$state){
        //待解决的问题
        return {
            islogin:function(){
            var d=$q.defer();
            $http.get('/islogin')
                .success(function(data,status){
                    //回头改为响应码
                    if(data ==='ok') {
                        console.log('front ok');
                        //$state.go('index.mykit.register');
                        $state.go('index.user');
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
        },
        }


    }
})();