/**
 * Created by jayuyao on 12/16/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
module App {

  export class PasswordResetService {

    static $inject = ['Restangular']

    constructor(private restangular: restangular.IService) {

    }

    public validateResetPasswordToken(token: string) {
      return this.restangular.one('reset-password/validate/' + token).get();
    }

    getResetPasswordToken(username: string){
      return this.restangular.one('reset-password').get({username: username});
    }

  }

  angular.module('App').service('PasswordResetService', PasswordResetService);

}
