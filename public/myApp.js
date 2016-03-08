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
                    templateUrl:'app/titlebar/mykit.html'
                })
                .state('index.mykit.login',{
                    url:'/login',
                    templateUrl:'app/view/login.html'
                })
                .state('index.mykit.register',{
                    url:'/register',
                    templateUrl:'app/view/register.html'
                })
            $urlRouterProvider.otherwise('/index/mykit/login');
        }]);
})();