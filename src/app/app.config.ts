
/// <reference path="../../typings/index.d.ts" />


module App {

  export interface IConstants {
    apiBase: string;
    version: string;
    build: string;
  }

  export class Constants {
    static get Default(): any {
      return {
        apiBase: 'http://localhost:8080/api',
        version: '1.0.0',
        build: '13',
      };
    }
  }

  angular.module('App').constant('AppConfiguration', Constants.Default);

}
