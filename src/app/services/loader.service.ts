module App {

  let app = angular.module('App');

  app.factory('LoadingCounter', ($timeout) => {
    var service: any = {};

    service.currentCounter = 0;
    service.finished = false;
    service.updateCounter = function (max) {
      service.currentCounter++;
      if (service.currentCounter == max) {
        $timeout(function () {
          service.finished = true;
        }, 2000);
      }
    };

    service.isFinished = function () {
      return service.finished;

    };

    return service;
  });

  app.directive('spinningLoader', (LoadingCounter) => {
    return {
      restrict: 'A', scope: {
        max: "="
      }, link: function (scope) {
        LoadingCounter.updateCounter(scope.max);
      }
    }
  });
}
