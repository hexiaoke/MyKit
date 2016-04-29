/**
 * Created by heke on 16/4/26.
 */
(function(){
    'use strict';
     angular.module('MyKit.dropdown',[])
     .directive('dropdown',dropdown);
    function dropdown() {
        return {
            restrict: 'EA',
            transclude: true,
            scope:false,
            template: '<a ><i class=" icon-angle-down "></i></a>\
                <ul class="dropdown-menu" id="header-dropdown">\
                <li><a><i class="  icon-dashboard"></i>账户管理</a></li>\
                <li><a><i class=" icon-exclamation-sign"></i>关于</a></li>\
                <li><a><i class="  icon-h-sign"></i>帮助</a></li>\
                <li ng-click="logout()" class="last"><a><i class=" icon-signout"></i>登出</a></li>\
            </ul>',
            link: function (scope) {
                //导航处dropdown
                var headerDropdown=document.getElementById('header-dropdown');
                scope.dropdown=function(event){
                    if(headerDropdown.classList.contains('header-dropdown')){
                        headerDropdown.classList.remove('header-dropdown');
                    }
                    else {
                        headerDropdown.classList.add('header-dropdown');
                    }
                    event.stopPropagation();
                };
                document.onclick=function(){
                    headerDropdown.classList.remove('header-dropdown');
                };
            }
        }
    }
})();