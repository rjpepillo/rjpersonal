module DetailsModule {
  class DetailsController {
    interests: any[] = [];
    slides: any;
    currentSlide: number;

    static $inject = ['$q'];

    constructor(private $q) {
    }

    $onInit() {
      this.initializeInterests().then((success)=> {
        this.currentSlide = 0;
        this.nextSlide();
      });
    }

    initializeInterests() {
      let defer = this.$q.defer();

      this.interests = [{image: "./assets/images/details/airplane-icon.png", label: "travelling"},
        {image: "./assets/images/details/dog-icon.png", label: "dogs"},
        {image: "./assets/images/details/cat-icon.png", label: "cats"},
        {image: "./assets/images/details/java-icon.png", label: "java"},
        {image: "./assets/images/details/css-icon.png", label: "css"},
        {image: "./assets/images/details/family-of-three-icon.png", label: "my family"},
        {image: "./assets/images/details/stark-icon.png", label: "game of thrones"},
        {image: "./assets/images/details/totoro-icon.png", label: "totoro"},
        {image: "./assets/images/details/music-icon.png", label: "music"},
        {image: "./assets/images/details/movie-player-icon.png", label: "fantasy movies"}];
      defer.resolve(this.interests);

      return defer.promise;
    }

    nextSlide() {
      this.goToSlide(this.currentSlide + 1);
    }

    previousSlide() {
      this.goToSlide(this.currentSlide - 1);
    }

    goToSlide(n) {
      $(document).ready(()=>{
        this.slides = document.querySelectorAll('#slides .slide');
        this.slides[this.currentSlide].className = 'slide';
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].className = 'slide showing';
      });
    }

  }

  angular.module('DetailsModule').component('ctDetails', {
    controller: DetailsController,
    controllerAs: 'detailsCtrl',
    templateUrl: 'app/content/details/details.template.html',
    resolve: {}
  });

}
