/**
 * Created by jayuyao on 12/22/2016.
 */
/// <reference path="../../../typings/index.d.ts" />

module App {


  import IPromise = angular.IPromise;
  export class DialogHelperService {

    static $inject = ['$mdDialog'];

    constructor(private $mdDialog: angular.material.IDialogService) {

    }

    showModalWithOkAndCancel(title: string, message: string) {

      var confirm = this.$mdDialog.confirm()
        .title(title).textContent(message)
        .targetEvent(<MouseEvent>event)
        .ok("Ok")
        .cancel("Cancel");

      return this.$mdDialog.show(confirm);
    }

    showModalWithYesAndNo(title: string, message: string) {

      var confirm = this.$mdDialog.confirm()
        .clickOutsideToClose(true)
        .title(title).textContent(message)
        .targetEvent(<MouseEvent>event)
        .ok("Yes")
        .cancel("No");

      return this.$mdDialog.show(confirm);
    }

  }

  angular.module('App').service('DialogHelperService', DialogHelperService);

}
