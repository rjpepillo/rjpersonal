/**
 * Created by jayuyao on 12/2/2016.
 */

  /// <reference path="../../../typings/index.d.ts" />
  /// <reference path="../shared/model.d.ts" />
module App {

  import ResourcePermission = model.ResourcePermission;
  import AccessToken = model.AccessToken;

  export class CurrentUserService {

    featureMap: Map<string, Array<string>>;

    static $inject = ['localStorageService', 'jwtHelper', 'FeaturesMapperService'];

    constructor(private localStorage: angular.local.storage.ILocalStorageService,
      private jwtHelper: angular.jwt.IJwtHelper, private featuresMapper: FeaturesMapperService) {
    }

    getUser() {
      let parsedToken = this.getParsedToken();
      if (parsedToken) {
        var authenticatedUser = new AuthenticatedUser();
        let tenantUser = parsedToken.tenantUserContext[0];
        if (tenantUser) {
          authenticatedUser.username = parsedToken.sub;
          authenticatedUser.userId = tenantUser.userId;
          authenticatedUser.role = tenantUser.role;
          authenticatedUser.permissions = tenantUser.accessLevels;
        }
        return authenticatedUser;
      }
    }

    getLandingPage() {
      let tenantUser = this.getTenantUser();
      if (tenantUser) {
        return tenantUser.landingPage;
      }
    }

    getFeatures(): FeatureModel[] {
      let tenantUser = this.getTenantUser();
      if (tenantUser) {
        return tenantUser.features;
      }
    }

    getTenant() {
      let tenantUser = this.getTenantUser();
      if (tenantUser) {
        return tenantUser.tenantId;
      }
    }

    private getParsedToken() {
      let accessToken = this.localStorage.get('access_token');
      if (accessToken) {
        return <AccessToken>this.jwtHelper.decodeToken(<string>accessToken);
      }
    }

    private getTenantUser() {
      let parsedToken = this.getParsedToken();
      if (parsedToken) {
        return parsedToken.tenantUserContext[0];
      }
    }

    getRole() {
      let tenantUser = this.getTenantUser();
      if (tenantUser) {
        return tenantUser.role;
      }
    }

    getFeatureMap() {

      if (this.featureMap) {
        return this.featureMap;
      }

      let parsedToken = this.getParsedToken();
      let features = this.getFeatures();
      let tenantUser = parsedToken.tenantUserContext[0];
      if (tenantUser) {
        let map = this.featuresMapper.createFeaturesMapping(features);
        let accessibleFeatures = this.featuresMapper.getAllScreensFromMapping(map);

        map[tenantUser.role] = accessibleFeatures;
        this.featureMap = map;

        return this.featureMap;
      }
    }

    checkIfWithActiveUser(): boolean {
      let result = true;

      let parsedToken = this.getParsedToken();

      if (parsedToken.tenantUserContext.length == 0) {
        result = false;
      }


      return result;
    }

  }

  export class AuthenticatedUser {
    userId: number;
    username: string;
    role: string;
    permissions: Array<ResourcePermission>;
  }

  angular.module('App').service('CurrentUserService', CurrentUserService);

}
