/**
 * Created by jayuyao on 12/16/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
module App {

  export class CredentialsService {

    static $inject = ['Restangular'];
    constructor(private restangular: restangular.IService){

    }

    resetPassword(credentials: NewPasswordDetails){
      return this.restangular.all("credentials/reset/password").post(credentials);
    }

    requestPasswordReset(request: NewPasswordRequest){
      return this.restangular.all('credentials/reset').post(request);
    }

  }

  export class NewPasswordRequest {
    username: string;
    url: string;
  }

  export class NewPasswordDetails {
    token: string;
    email: string;
    defaultPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  angular.module("App").service("CredentialsService", CredentialsService);


}
