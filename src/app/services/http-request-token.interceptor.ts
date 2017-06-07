/**
 * Created by jayuyao on 11/18/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
///<reference path="./authentication.service.ts"/>
module App {

  export class HttpRequestTokenInterceptor {

    private localStorage: angular.local.storage.ILocalStorageService;
    private jwtHelper: angular.jwt.IJwtHelper;
    private qService: angular.IQService;
    private injectorService: angular.auto.IInjectorService;
    static $inject = ['localStorageService', 'jwtHelper', '$q', '$injector'];

    constructor(localStorage: angular.local.storage.ILocalStorageService,
                jwtHelper: angular.jwt.IJwtHelper,
                qService: angular.IQService,
                injector: angular.auto.IInjectorService) {
      this.localStorage = localStorage;
      this.jwtHelper = jwtHelper;
      this.qService = qService;
      this.injectorService = injector;
      return;
    }

    request = (config: angular.IRequestConfig|angular.IPromise<any>) => {

      if ((<angular.IRequestConfig>config).headers['X-Token-Request'] != true) {

        var accessToken = this.localStorage.get('access_token');
        var refreshToken = this.localStorage.get('refresh_token');


        if (accessToken) {

          if (this.jwtHelper.isTokenExpired(accessToken)) {

              if (this.jwtHelper.isTokenExpired(refreshToken)) {
                // This $http interceptor will intercept all requests;
                // even the request to get a new Token is intercepted, which will cause an infinite loop.
                // The X-Token-Request header marks the Token request so it will be ignored
                // by the interceptor.
                this.showLogin();

              } else {
                 // Modification of $http via this intercepor + AuthenticationService's
                  // use of Restangular which also relies on $http causes a circular dependency
                  // http://stackoverflow.com/q/20647483
                this.refreshToken(config, refreshToken);
              }
          } else {

            (<angular.IRequestConfig>config).headers['Authorization'] = 'Bearer ' + accessToken;
          }
        }
      }
      return config;
    }

    private refreshToken(config: angular.IRequestConfig|angular.IPromise<any>, refreshToken: string ) {

      var RestangularService = <restangular.IService>this.injectorService.get('Restangular');
      var tokenEndpoint = RestangularService.one('auth/token');

       tokenEndpoint.get({}, {
        'X-Token-Request': true,
        'Authorization': refreshToken

      }).then((response: model.JwtToken)=> {

        this.localStorage.set('refresh_token', response.refreshToken);
        this.localStorage.set('access_token', response.accessToken);
        (<angular.IRequestConfig>config).headers['Authorization'] = 'Bearer ' + response.accessToken;

      }).catch((error: model.HttpError) => {

        this.showLogin();
      })
    }

    private showLogin() {
      // remove tokens
      this.localStorage.remove('refresh_token');
      this.localStorage.remove('access_token');
      // cast to avoid TS2339
      let state:angular.ui.IStateService = <angular.ui.IStateService>this.injectorService.get('$state');
      state.transitionTo('login');
    }
  }


  angular.module('App').service('HttpRequestTokenInterceptor', HttpRequestTokenInterceptor);

}
