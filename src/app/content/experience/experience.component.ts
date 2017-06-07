module ExperienceModule {
  class ExperienceController {

    companies: any = [];

    static $inject = ['LoadingCounter'];

    constructor() {

    }

    $onInit() {
      this.setCompanies();
    }

    setCompanies() {
      this.companies = [{
        name: "Cormant Technologies, Inc.",
        link: "www.cormanttech.com",
        image: {src: "./assets/images/experience/cormant.png", bgColor: "#BEB7A4"},
        positions: [{
          name: "Software Design Engineer",
          sub: "*SDE 2 on January 2017",
          date: "(April 2016 - April 2017)",
          description: "I worked with the Cormant Java team on pioneering a project for schools and hotels. It was a great"
          + " opportunity to learn more about Java, HTML, and CSS, and gain new knowledge on AngularJS, Javascript, and Spring Framework."
        }, {
          name: "Scripting Engineer",
          date: "(April 2015 - April 2016)",
          description: "Involved in the Cormant mPower project as a Scripting Engineer, who is responsible for"
          + " Test Planning, Test Design, Test Execution, Defect Submission and Testing, and Test Maintenance."
          + " I developed test scripts for web and mobile applications using various test automation frameworks such as "
          + "Selenium WebDriver, Appium, and JUnit."
        }]
      }, {
        name: "PAC APL Co. Pte. Ltd.",
        link: "",
        image: {src: "./assets/images/experience/pac apl.png", bgColor: "white"},
        positions: [{
          name: "System Support Analyst",
          date: "(August 2014 - January 2015)",
          description: "I worked with the RFT team to support clients from North and South China with the use of rate filing tools. "
          + "Aside from creating customer agreements based on infos received from sales and pricing dept., I also reviewed fees and surcharges, "
          + "monitored progress for each request, and support if revisions are necessary."
        }]
      }, {
        name: "Ateneo de Davao University",
        link: "http://www.addu.edu.ph/",
        image: {src: "./assets/images/experience/addu.png", bgColor: "#BEB7A4"},
        positions: [{
          name: "Graduate of Bachelor of Science in Information Technology",
          date: "(2009 - 2013)",
          description: "AdDU equipped me with the skills and knowledge needed for the work environment. AdDU was where I was able to learn and "
          + "practice Java and C# programming languages, learn a thing or two about CISCO Networking and Robotics"
          + "(although I'm not too fond of tinkering hardwares), and become involved in the Ciphers Dance Crew, the Computer Studies' "
          + "dance troupe, wherein I was able to compete each year in the interschool PSITS dance group competition."
        }]
      }];
    }

  }

  angular.module('ExperienceModule').component('ctExperience', {
    controller: ExperienceController,
    controllerAs: 'expCtrl',
    templateUrl: 'app/content/experience/experience.template.html',
    resolve: {}
  });

}
