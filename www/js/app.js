// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'ngResource', 'app.controllers', 'app.services','ngCordova'])



.run(function($ionicPlatform,$cordovaVibration,$cordovaDialogs) {
    $ionicPlatform.ready(function() {
        
    navigator.splashscreen.hide();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    if(window.cordova && window.cordova.plugins.Keyboard) {        
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.inicio', {
      url: '/inicio',
      views: {
        'tab-inicio': {
          templateUrl: 'templates/tab-inicio.html',
          controller: 'InicioCtrl'
        }
      }
    })

    .state('tab.registros', {
      url: '/registros',
      views: {
        'tab-registros': {
          templateUrl: 'templates/tab-registros.html',
          controller: 'RegistroCtrl'
        }
      }
    })
    
    .state('tab.configuracoes', {
      url: '/configuracoes',
      views: {
        'tab-configuracoes': {
          templateUrl: 'templates/tab-configuracoes.html',
          controller: 'ConfigCtrl'
        }
      }
    })
  .state('tab.info', {
      url: '/info',
      views: {
        'tab-info': {
          templateUrl: 'templates/tab-info.html',
          controller: 'InfoCtrl'
        }
      }
    })
  .state('tab.turnoMaximo', {
      url: "/TurnoMaximo",
      views: {
        'tab-info': {
          templateUrl: "templates/Info/turnoMaximoInfo.html"
        }
      }
    })
  .state('tab.interjornada', {
      url: "/Interjornada",
      views: {
        'tab-info': {
          templateUrl: "templates/Info/Interjornada.html"
        }
      }
    })
  .state('tab.horasTrabalhadasPorDia', {
      url: "/HorasTrabalhadasPorDia",
      views: {
        'tab-info': {
          templateUrl: "templates/Info/HorasTrabalhadasPorDia.html"
        }
      }
    })
  .state('tab.esquecimentoBatida', {
      url: "/EsquecimentoBatida",
      views: {
        'tab-info': {
          templateUrl: "templates/Info/EsquecimentoBatida.html"
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/inicio');

});

app.onReminderAdd = function(id, state, json) {
  $timeout(function() {
    $rootScope.$broadcast('onReminderAdded', id, state, json);
  }, 100);
}