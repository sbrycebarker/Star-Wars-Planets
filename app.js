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
          templateUrl: './views/Tatooine.html',
          controller: 'planetCtrl'
        })
        .state('Hoth', {
          url: '/Hoth',
          templateUrl: './views/Hoth.html',
          controller: 'planetCtrl'
        })
        .state('Dagobah', {
          url: '/Dagobah',
          templateUrl: './views/Dagobah.html',
          controller: 'planetCtrl'
        })
        .state('Coruscant', {
          url: '/Coruscant',
          templateUrl: './views/coruscant.html',
          controller: 'planetCtrl'
        })
        .state('Mustafar', {
          url: '/Mustafar',
          templateUrl: './views/mustafar.html',
          controller: 'planetCtrl'
        })

})
