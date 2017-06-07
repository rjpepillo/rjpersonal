/**
 * Created by jayuyao on 11/18/2016.
 */
/// <reference path="../../typings/index.d.ts" />

module App {

  angular.module('App').config(['localStorageServiceProvider', (localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider) => {
    localStorageServiceProvider.setPrefix('isecure');
    localStorageServiceProvider.setStorageType('localStorage');
  }]);

}
