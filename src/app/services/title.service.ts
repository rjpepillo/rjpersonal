
module App {
  export class TitleService {

    private TITLE_PREFIX = "RJ";
    title: string;

    constructor(){
      this.title = this.TITLE_PREFIX;
    }

    addSuffix(suffix: string) {
      this.title = this.TITLE_PREFIX +": "+ suffix;
    }

    getTitle(): string {
      return this.title;
    }



  }

  angular.module('App').service('TitleService', TitleService);
}
