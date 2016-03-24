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
            islogin: function(){
                return $q(function(resolve, reject) {
                    $http.get('/islogin')
                        .success(function(data, status){
                            //回头改为响应码
                            if(status === 200) {
                                //$state.go('index.mykit.register');
                                $state.go('index.user.welcome');
                                //$location.path('/index/mykit/register');
                            }
                            if(data ==='no') {
                                $state.go('index.mykit.login');
                            }
                            resolve(data);
                        })
                        .error(function(data,status){
                            reject(data);
                        });
                });
            },
            getTodos:function(){
                return $q(function(resolve,reject){
                    $http.get('/getTodos')
                        .success(function(data,status){
                            resolve(data);
                        })
                        .error(function(data,status){
                            reject(data);
                        });
                });
            }
        }


    }
})();