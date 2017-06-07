/**
 * Created by jayuyao on 12/16/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
module App {

  export class ToastHelperService {

    static $inject = ['$mdToast']

    constructor(private $mdToast: angular.material.IToastService){

    }

    showToast(message: string){
      var toast = this.$mdToast.simple().textContent(message).position("bottom right");
      this.$mdToast.show(toast);
    }

    showToastWithClose(message: string){
      var toast = this.$mdToast.simple().textContent(message).position("bottom right").action("Close");
      var result = this.$mdToast.show(toast);
    }

  }

  angular.module('App').service('ToastHelperService', ToastHelperService);

}
