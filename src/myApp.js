/**
 * Created by heke on 16/3/3.
 */
(function(){
    'use strict';
    angular
        .module('MyKit',['ui.router','MyKit.register','MyKit.login','MyKit.homepage','MyKit.services'])
        .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('index',{
                    abstract:true,
                    url:'',
                    template:'<div ui-view></div>'
                })
                .state('index.mykit',{
                    url:'/mykit',
                    templateUrl:'app/homepage/mykit.html'
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
                .state('index.user',{
                    url:'/user',
                    templateUrl:'app/homepage/homepage.html',
                    controller:'homepageController'
                })
                .state('index.user.todolist',{
                    url:'/todolist',
                    templateUrl:'app/view/todolist/todoList.html'
            });
            $urlRouterProvider.when('','/mykit/login');


        }]);
})();