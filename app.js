angular.module('myApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider) {
$urlRouterProvider.when('', '/');
        $stateProvider
        .state('home', {
          url:'/',
          templateUrl: "./views/main.html",
          controller: 'mainCtrl'
        })
        .state('Tatooine', {
          url: '/Tatooine',
          templateUrl: './views/tatooine.html',
          controller: 'planetCtrl'
        })
        .state('Hoth', {
          url: '/Hoth',
          templateUrl: './views/Hoth.html',
          controller: 'planetCtrl'
        })
        .state('Dagobaa', {
          url: '/Dagobaa',
          templateUrl: './views/Dagobaa.html',
          controller: 'planetCtrl'
        })

})
