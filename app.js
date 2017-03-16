angular.module('myApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider) {
$urlRouterProvider.when('', '/');
        $stateProvider
        .state('home', {
          url:'/',
          templateUrl: "./views/main.html",
          controller: 'mainCtrl'
        })
        .state('one', {
          url: '/one',
          templateUrl: 'views/one.html',
          controller: 'mainCtrl'
        })
        .state('two', {
          url: '/two',
          templateUrl: './views/two.html',
          controller: 'mainCtrl'
        })
        .state('three', {
          url: '/three',
          templateUrl: './views/three.html',
          controller: 'mainCtrl'
        })

})
