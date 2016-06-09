var appCRM = angular.module('sinav', [ 'ui.router', 'ngSanitize']);

	appCRM.config( function( $stateProvider, $urlRouterProvider ){

      $urlRouterProvider.when('', '/home');
      $urlRouterProvider.when('/', '/home');

      $stateProvider
          .state('main', {
            url     : '/home',
            templateUrl: 'templates/test.html',
            controller  : 'sorularController'
          })
          

    });


  appCRM.run(
    function( $rootScope, $location) {

      var original = $location.path;
      $location.path = function (path, reload) {
        
        return original.apply($location, [path]);
      };

});

