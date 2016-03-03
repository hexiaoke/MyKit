/**
 * Created by heke on 16/3/3.
 */
(function(){
    'use strict';
    angular
        .module('MyKit',['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('index',{
                    abstrict:true,
                    url:'/index',
                    template:'<div ui-view></div>'
                })
                .state('index.mykit',{
                    url:'/mykit',
                    templateUrl:'mykit.html'
                })
                .state('index.mykit.login',{
                    url:'/login',
                    templateUrl:'login.html'
                })
                .state('index.mykit.register',{
                    url:'/register',
                    templateUrl:'register.html'
                })
            $urlRouterProvider.otherwise('/index/mykit');
        }]);
})();