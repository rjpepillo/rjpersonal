/// <reference path="../../typings/index.d.ts" />
/// <reference path="../app/shared/model.d.ts" />
/// <reference path="./services/navigation.service.ts" />
module App {

  angular
    .module('App')
    .config(routesConfig)
    .run(runConfig);

  /** @ngInject */
  function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    var indexState = {
      name: 'index', templateUrl: 'index.html', abstract: true
    };

    // the app state is the authenticated/secure part of the site
    // all other states/pages must reference this as its parent following the convention
    // name: app.state_name
    var appState = {
      name: 'app', url: '', parent: 'index', component: 'ctMainFrame', //templateUrl: 'app/views/app.template.html',
      abstract: true
    };

    var wrapper = {
      name: 'app.main',
      url: '/main',
      abstract: true,
      templateUrl: "app/views/content-wrapper.template.html"
    };

    var contentStates = {
      url: '', parent: wrapper, name: 'app.main.content', views: {
        "bio@app.main": {
          name: 'app.main.content.bio',
          component: 'ctBio'
        }, "experience@app.main": {
          name: 'app.main.content.experience',
          component: 'ctExperience'
        }, "skills@app.main": {
          name: 'app.main.content.skills',
          component: 'ctSkills'
        }, "details@app.main": {
          name: 'app.main.content.details',
          component: 'ctDetails'
        }
      }
    };

    $stateProvider.state(indexState);

    $stateProvider.state(appState);
    $stateProvider.state(wrapper);

    $stateProvider.state(contentStates);

    $urlRouterProvider.otherwise('/main');
  }

  function runConfig($transitions, NavigationService: App.NavigationService) {
    $transitions.onBefore({
      to: 'app.**'
    }, (trans) => {
      /*if(NavigationService.isStateChangeAllowed(trans.to().name)){
       return true;
       } else {
       return false;
       }*/
      return true;
    });

  }

}


