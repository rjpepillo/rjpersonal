
module SkillsModule {
  class SkillsController {

    tiles: any;
    skills: any[] = [];

    static $inject = [];

    constructor() {

    }

    $onInit() {
      this.tiles = this.buildGrid({icon:"./assets/images/skills/", title:"", background:""})
    }

    private buildGrid(tileTemplate) {
      this.skills = ['css', 'html', 'javascript', 'nodejs', 'csharp', 'angularjs', 'photoshop', 'illustrator',
                     'bitbucket', 'sourcetree', 'java' , 'bower', 'gulp','typescript', 'sql server'];

      var item, results = [ ];

      for (let j=0; j < this.skills.length; j++) {
        item = angular.extend({},tileTemplate);
        item.icon  = item.icon + this.skills[j] + ".png";
        item.name = this.skills[j];

        item = this.getItemSizeAndColor(j, item);

        results.push(item);
      }
      return results;
    }

    private getItemSizeAndColor(index, item){
      item.span  = { row : 1, col : 1 };
      switch(index+1) {
        case 1:
          item.background = "darkBlue";
          break;

        case 2: item.background = "green";         break;
        case 3: item.background = "red";
          item.span.row = item.span.col = 2;      break;
        case 4:
          item.background = "yellow";
          break;

        case 5:
          item.background = "lightPurple";
          break;

        case 6: item.background = "yellow";
          item.span.row = item.span.col = 2;      break;
        case 7: item.background = "darkBlue";      break;
        case 8: item.background = "purple";        break;
        case 9: item.background = "deepBlue";     break;
        case 10: item.background = "lightPurple";  break;
        case 11: item.background = "green";
          item.span.row = item.span.col = 2;       break;
        case 12: item.background = "purple";        break;
        case 13: item.background = "green";     break;
        case 14: item.background = "lightPurple";  break;
        case 15: item.background = "yellow";  break;
      }
      return item;
    }

  }

  angular.module('SkillsModule').component('ctSkills', {
    controller: SkillsController,
    controllerAs: 'skillsCtrl',
    templateUrl: 'app/content/skills/skills.template.html',
    resolve: {}
  });

}
