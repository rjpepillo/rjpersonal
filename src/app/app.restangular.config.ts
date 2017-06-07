
/**
 * Created by jayuyao on 12/2/2016.
 */
/// <reference path="../../typings/index.d.ts" />
module App {

  import IHttpProvider = angular.IHttpProvider;
  angular.module('App').config(['RestangularProvider', 'AppConfiguration', (RestangularProvider: restangular.IProvider, AppConfiguration: App.IConstants) => {
    RestangularProvider.setBaseUrl(AppConfiguration.apiBase);
    RestangularProvider.setDefaultHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  }]);

  angular.module('App').config(['$httpProvider', ($httpProvider:IHttpProvider) => {
    $httpProvider.interceptors.push('HttpRequestTokenInterceptor');
  }])

}
