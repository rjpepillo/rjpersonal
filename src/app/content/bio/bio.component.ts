
module BioModule {
  class BioController {

    static $inject = [];

    constructor() {

    }

  }

  angular.module('BioModule').component('ctBio', {
    controller: BioController,
    controllerAs: 'bioCtrl',
    templateUrl: 'app/content/bio/bio.template.html',
    resolve: {}
  });

}
