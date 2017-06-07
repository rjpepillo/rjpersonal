/// <reference path="../../typings/index.d.ts" />
'use strict';

module App {
  angular.module('App',
    ['angular-jwt', 'LocalStorageModule', 'md.data.table', 'ngAria', 'ngFileUpload', 'ngImgCrop', 'ngMaterial',
      'ngMessages', 'restangular', 'ui.router', 'ExperienceModule', 'BioModule', 'SkillsModule', 'DetailsModule']);
}
