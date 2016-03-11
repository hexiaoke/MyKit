/**
 * Created by heke on 16/3/3.
 */
(function(){
    'use strict';
    angular
        .module('MyKit',['ui.router','MyKit.register','MyKit.login','MyKit.container'])
        .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('index',{
                    abstrict:true,
                    url:'/index',
                    template:'<div ui-view></div>'
                })
                .state('index.mykit',{
                    url:'/mykit',
                    templateUrl:'app/titlebar/mykit.html'
                })
                .state('index.mykit.login',{
                    url:'/login',
                    templateUrl:'app/view/login/login.html',
                    controller:'loginController'
                })
                .state('index.mykit.register',{
                    url:'/register',
                    templateUrl:'app/view/register/register.html',
                    controller:'registerController'
                })
                .state('index.container',{
                    url:'/container',
                    templateUrl:'app/titlebar/container.html',
                    controller:'containerController'
                });

            $urlRouterProvider.otherwise('/index/mykit/login');
        }]);
})();