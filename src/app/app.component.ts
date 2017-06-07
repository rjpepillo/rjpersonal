/// <reference path="../../typings/index.d.ts" />

'use strict';

module App {
  "use strict";
  import * as _ from "lodash";
  import UserResponse = model.UserResponse;
  import NavItem = model.NavItem;
  import ILocalStorageService = angular.local.storage.ILocalStorageService;

  class MainFrameController {
    sidebarItems: any[];
    user: UserResponse;
    showSidebar: boolean = false;
    navBarItems: NavItem[];

    //https://www.materialpalette.com/icons
    static $inject = ['$location', '$anchorScroll', 'AuthenticationService', 'CurrentUserService', 'DialogHelperService', 'NavigationService',
      'TitleService', 'ToastHelperService', 'localStorageService'];

    constructor(private $location, private $anchorScroll, private authenticationService: AuthenticationService, private currentUserService: CurrentUserService,
      private dialogHelperService: DialogHelperService, private navigationService: NavigationService,
      private titleService: TitleService, private toastHelperService: ToastHelperService,
      private localStorageService: ILocalStorageService) {

    }

    $onInit() {
      this.loadNavBarItems();

      let state: string = this.localStorageService.get('navSelect');
      this.highlightItem(state);
    }

    loadNavBarItems() {
      this.navBarItems = [{
        name: 'HOME', selected: false, state: 'bio'
      }, {
        name: 'EXPERIENCE', selected: false, state: 'experience'
      }, {
        name: 'SKILLS', selected: false, state: 'skills'
      }, {
        name: 'BIO', selected: false, state: 'details'
      }];
    }

    selectNavItem(selectedItem: NavItem) {
      this.highlightItem(selectedItem.name);

      //this.navigationService.navigateToView(selectedItem.state)
      window.location.href= '#'+selectedItem.state;
    }

    private highlightItem(name: string) {
      _.each(this.navBarItems, (item: NavItem) => {
        item.selected = item.name == name;
        if (item.selected) {
          this.localStorageService.set('navSelect', item.name);
        }
      });
    }

    moveDown() {
      this.goToAnchor('experience');
    }

    goToAnchor(anchorId: string){
      if (this.$location.hash() !== anchorId) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        this.$location.hash(anchorId);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        this.$anchorScroll();
      }
    };
  }

  angular
    .module('App')
    .component('ctMainFrame', {
      controller: MainFrameController, controllerAs: 'mainFrameCtrl', templateUrl: 'app/views/app.template.html'
    });
}
