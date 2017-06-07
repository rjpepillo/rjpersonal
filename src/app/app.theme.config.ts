module App {
  angular.module('App')
    .config(materialTheme);

  function materialTheme($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue');
  }
}
