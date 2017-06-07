/**
 * Created by jayuyao on 11/15/2016.
 */
///<reference path="../../../typings/index.d.ts" />
///<reference path="../shared/model.d.ts"/>
  ///<reference path="./current-user.service.ts"/>
module App {

  import JwtToken = angular.jwt.JwtToken;
  import AccessToken = model.AccessToken;
  export class AuthenticationService {

    private restangular: restangular.IService;
    private localStorage: angular.local.storage.ILocalStorageService;
    private jwtHelper: angular.jwt.IJwtHelper;
    private currentUserService: App.CurrentUserService;
    private featuresMapper: FeaturesMapperService;

    static $inject = ['Restangular', 'localStorageService', 'jwtHelper', 'CurrentUserService', 'FeaturesMapperService'];

    constructor(private Restangular: restangular.IService,
                localStorage: angular.local.storage.ILocalStorageService,
                jwtHelper: angular.jwt.IJwtHelper,
                currentUserService: App.CurrentUserService,
                featuresMapper: FeaturesMapperService) {
      this.restangular = Restangular;
      this.localStorage = localStorage;
      this.jwtHelper = jwtHelper;
      this.currentUserService = currentUserService;
      this.featuresMapper = featuresMapper;
    }

    login(credentials: App.AuthenticationCredentials) {
      var loginEndpoint = this.restangular.all('auth/login');
      var result = loginEndpoint.post(
        {
          username: credentials.username,
          password: credentials.password
        });

      result.then((response: model.JwtToken)=> {
        if (response) {

          this.localStorage.set('refresh_token', response.refreshToken);
          this.localStorage.set('access_token', response.accessToken);

          let features = this.currentUserService.getFeatures();
          let map = this.featuresMapper.createFeaturesMapping(features);
          let accessibleFeatures = this.featuresMapper.getAllScreensFromMapping(map);

          map[this.currentUserService.getRole()] = accessibleFeatures;
          this.currentUserService.featureMap = map;
        }
      });
      return result;
    }

    isLoggedIn(){
      if(this.isTokenValid('refresh_token') && this.isTokenValid('access_token')){
        return true;
      }
      return false;
    }

    logout(){
      this.localStorage.clearAll();
    }

    private isTokenValid(tokenKey: string){
      var token = this.localStorage.get(tokenKey);
      if(token){
        var tokenExpired = this.jwtHelper.isTokenExpired(token);
        if(!tokenExpired){
          return true;
        }
      }
      return false;
    }

  }




  export class AuthenticationCredentials {
    username: string;
    password: string;
  }

  angular.module('App').service('AuthenticationService', AuthenticationService);

}
