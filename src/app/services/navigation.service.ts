/**
 * Created by jayuyao on 11/17/2016.
 */
  /// <reference path="../../../typings/index.d.ts" />
  ///<reference path="./current-user.service.ts"/>
module App {

  import * as _ from "lodash";
  export class NavigationService {

    private pagePermissions: Map<string, Array<string>>;
    private currentState: string = '';
    static $inject = ['$state', 'CurrentUserService', 'FeaturesMapperService'];

    constructor(private $state: angular.ui.IStateService,
                private currentUserService: App.CurrentUserService,
                private featuresMapper: FeaturesMapperService) {
    }

    getCurrentState(): string {
      return this.currentState;
    }

    loadDefaultState() {
      /*let user = this.currentUserService.getUser();
       let userRole = user.role;*/
      let landingPage = this.currentUserService.getLandingPage();
      this.$state.go(landingPage);
    }

    isStateChangeAllowed(state: string) {
      let user = this.currentUserService.getUser();
      if (user) {
        this.pagePermissions = this.generatePagePermissionsMap();
        let permittedPages = this.pagePermissions[user.role];
        if (permittedPages.indexOf(state) != -1) {
          return true;
        }
      }
      return false;
    }

    navigateToView(state: State) {
      this.currentState = this.getStringOfEnum(State, state);
      this.$state.go(state);
    }

    navigateToView(state: string) {
      this.currentState = state;
      this.$state.go(state);
    }

    private getStringOfEnum(enumList, value) {
      for (var key in enumList) {
        if (enumList[key] == value)
        return key;
      }
      return null;
    }

    private generatePagePermissionsMap() {
      let user = this.currentUserService.getUser();
      if (user) {
        let map = this.currentUserService.getFeatureMap();
        return map;
      }
    }

  }

  angular.module('App').service('NavigationService', NavigationService);

}

