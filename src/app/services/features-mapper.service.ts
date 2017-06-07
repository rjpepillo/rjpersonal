module App {

  import * as _ from "lodash";
  export class FeaturesMapperService {
    static $inject = [];

    private pageFeatures: Map<string, Array<string>>;
    private landingPages: Map<string, string>;

    constructor() {
      this.setDefaultMapping();
    }

    setDefaultMapping() {
      this.pageFeatures = new Map<string, Array<string>>();
      this.pageFeatures[Features.CUSTOM_FIELDS] = ["app.custom-fields", "app.custom-fields.list"];
      this.pageFeatures[Features.MOBILE_PRIMARY] = ["app.primary"];
      this.pageFeatures[Features.MOBILE_TERMINAL] = ["app.terminals.add", "app.terminals.edit"];
      this.pageFeatures[Features.ROLES] = ["app.roles", "app.roles.list", "app.roles.edit"];
      this.pageFeatures[Features.SETTINGS] = ["app.settings", "app.settings.list", "app.settings.edit",];
      this.pageFeatures[Features.TERMINALS] = ["app.terminals", "app.terminals.list",];
      this.pageFeatures[Features.USERS] =
        ["app.users", "app.users.list", "app.users.add", "app.users.edit", "app.users.upload"];

      this.landingPages = new Map<string, string>();
      this.landingPages[Features.CUSTOM_FIELDS] = "app.custom-fields.list";
      this.landingPages[Features.MOBILE_PRIMARY] = "app.primary";
      this.landingPages[Features.MOBILE_TERMINAL] = "app.terminals";
      this.landingPages[Features.ROLES] = "app.roles.list";
      this.landingPages[Features.SETTINGS] = "app.settings.list";
      this.landingPages[Features.TERMINALS] = "app.terminals.list";
      this.landingPages[Features.USERS] = "app.users.list";
      this.landingPages[Features.PROFILE] = "app.profile";
      this.landingPages[Features.DOWNLOAD_APP] = "app.download";
    }

    getDefaultFeatures() {
      return this.pageFeatures;
    }

    getDefaultLandingPages() {
      return this.landingPages;
    }

    createFeaturesMapping(features: FeatureModel[]): Map<string, Array<string>> {
      let map = new Map<string, Array<string>>();
      _.each(features, (feature: FeatureModel) => {
        map[feature.name] = feature.screens.split('|');
      });
      return map;
    }

    getAllScreensFromMapping(map: Map<string, Array<string>>) {
      let screens: string[] = [];
      for (let key in map) {
        let value: Array<string> = map[key];
        screens = screens.concat(value);
      }
      return screens;
    }

    getAllFeaturesFromMap(map: Map<string, Array<string>>) {
      let features: string[] = [];
      for (let key in map) {
        features = features.concat(key);
      }
      return features;
    }
  }

  angular.module('App').service('FeaturesMapperService', FeaturesMapperService);

}
