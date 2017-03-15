angular.module('myApp', ['ui.router']).config(function, ($urlRouterProvider, $stateProvider) {

        $stateProvider
        .state('home', {
          url:'/',
          templateUrl: "./views/main.html"
          controller: 'mainCtrl'
        })
        .state('one', {
          url: '/one',
          templateUrl: './html/one.html',
          controller: 'mainCtrl'
        })
        .state('two', {
          url: '/two',
          templateUrl: './html/two.html',
          controller: 'mainCtrl'
        })
        .state('three', {
          url: '/three',
          templateUrl: './html/three.html',
          controller: 'mainCtrl'
        })

})
