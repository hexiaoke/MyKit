/**
 * Created by heke on 16/3/3.
 */
(function(){
    'use strict';
    angular
        .module('MyKit',['ui.router','MyKit.register','MyKit.login','MyKit.homepage','MyKit.services','MyKit.dropdown'])
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
                    abstract:true,
                    url:'/user',
                    templateUrl:'app/homepage/homepage.html',
                    controller:'homepageController'
                })
                .state('index.user.welcome',{
                    url:'',
                    template:'<p>hello</p>'
                })
                .state('index.user.todolist',{
                    url:'/todolist',
                    abstract:true,
                    templateUrl:'app/view/todolist/todoList.html'
                })
                .state('index.user.todolist.all',{
                    url:'/all',
                    templateUrl:'app/view/todolist/todoAll.html'
                })
                .state('index.user.todolist.create',{
                    url:'/create',
                    templateUrl:'app/view/todolist/todoCreate.html'
                })
                .state('index.user.todolist.completed',{
                    url:'/completed',
                    templateUrl:'app/view/todolist/todoComplete.html'
                })
                .state('index.user.todolist.planed',{
                    url:'/planed',
                    templateUrl:'app/view/todolist/todoPlan.html'
                })
                .state('index.user.contactlist',{
                    url:'/contactlist',
                    abstract:true,
                    templateUrl:'app/view/contactlist/contactList.html'
                })
                .state('index.user.contactlist.all',{
                    url:'/all',
                    templateUrl:'app/view/contactlist/contactAll.html'
                })
                .state('index.user.contactlist.create',{
                    url:'/create',
                    templateUrl:'app/view/contactlist/contactCreate.html'
                })
                .state('index.user.contactlist.special',{
                    url:'/special',
                    templateUrl:'app/view/contactlist/contactSpecial.html'
                })
                .state('index.user.financial',{
                    url:'/financial',
                    abstract:true,
                    templateUrl:'app/view/financial/financial.html'
                })
                .state('index.user.financial.all',{
                    url:'/all',
                    templateUrl:'app/view/financial/financialAll.html'
                })
                .state('index.user.financial.create',{
                    url:'/create',
                    templateUrl:'app/view/financial/financialCreate.html'
                })
                .state('index.user.account',{
                    url:'/account',
                    templateUrl:'app/view/account/account.html'
                })
                .state('index.user.account.detail',{
                    url:'/detail',
                    templateUrl:'app/view/account/accountDetail.html'
                })
                .state('index.user.account.password',{
                    url:'/alterPassword',
                    templateUrl:'app/view/account/accountPassword.html'
                });

            $urlRouterProvider.when('','/mykit/login');


        }]);
})();