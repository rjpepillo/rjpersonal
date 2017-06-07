import PhotoUploadService = App.PhotoUploadService;
module App {

  import * as _ from "lodash";
  import IDialogService = angular.material.IDialogService;
  import IScope = angular.IScope;
  import PhotoUploadResponse = model.PhotoUploadResponse;
  export class PhotoUploadService {

    file: PhotoUploadResponse = null;
    static $inject = ['$mdDialog', '$log', '$q'];

    constructor(private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService,
      private $q: angular.IQService) {
      this.file = null;
    }

    showUploadDialog(event) {
      const defer = this.$q.defer<PhotoUploadResponse>();
      this.$mdDialog.show({
        controller: DialogController,
        controllerAs: 'photoUploadCtrl',
        templateUrl: 'app/views/photo-upload.template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true
      })
        .then((response: PhotoUploadResponse)=> {
          this.file = response;
          this.$log.debug(this.file);
          defer.resolve(this.file);
        }, (error)=> {
          this.$log.debug("PhotoUploadService cancelled.");
          defer.reject(error)
        });
      return defer.promise;
    }

    getFile() {
      if (this.file && this.file.Location) {
        return this.file;
      }
    }
  }

  class DialogController {

    private credentials = {
      bucket: 'isecureph', access_key: 'AKIAJ4FBRA3I4GV77VFA', secret_key: '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'
    };

    isValid: boolean = false;
    data = {
      selected: '', imgToCrop: ''
    };
    result: string;
    errorMessage: string;
    progress: string;

    static $inject = ['$log', '$mdDialog', '$scope', '$timeout', 'Upload', 'ToastHelperService'];

    constructor(private $log: angular.ILogService,
      private $mdDialog: IDialogService,
      private $scope: IScope,
      private $timeout,
      private fileUpload,
      private toastHelperService: ToastHelperService) {
        this.startBind();
    }

    $onInit() {
      this.errorMessage = '';
      this.progress = '';
      this.result = '';
      this.clearFields();
    }

    clearFields() {
      this.errorMessage = '';
      this.isValid = false;
    }

    startBind() {
      this.$scope.$watch(() => {
        return this.data.selected
      }, (newValue: File, oldValue)=> {
        if (newValue && newValue.name) {
          if (!newValue.name.toLowerCase().endsWith("jpeg")
            && !newValue.name.toLowerCase().endsWith("png")
            && !newValue.name.toLowerCase().endsWith("jpg")) {
            this.data.selected = '';
            this.data.imgToCrop = '';
            this.isValid = false;
            this.errorMessage = 'Supported files: JPG, JPEG, PNG';
          } else {
            this.isValid = true;
          }
        }
      });
    }

    hide() {
      this.$mdDialog.hide();
    }
    ;

    cancel() {
      this.$mdDialog.cancel();
    }
    ;

    answer(answer) {
      this.$mdDialog.hide(answer);
    }
    ;

    upload(dataUrl, name) {
      this.$log.debug("DataURL:" + dataUrl);
      this.$log.debug("Name:" + name);
      if (dataUrl && name) {
        AWS.config.update({accessKeyId: this.credentials.access_key, secretAccessKey: this.credentials.secret_key});
        AWS.config.region = 'ap-southeast-1';
        var bucket = new AWS.S3({params: {Bucket: this.credentials.bucket}});

        let file = this.fileUpload.dataUrltoBlob(dataUrl, name);
        if (file) {
          var params = {Key: file.name, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256'};
          let vm = this;

          bucket.upload(params, function (error, data) {
            if (error) {
              // There Was An Error With Your S3 Config
              vm.$log.debug(error.message);
              if (error.status > 0) vm.errorMessage = error.status + ': ' + error.data;
              vm.toastHelperService.showToastWithClose("Upload failed. Please try again.");
              return false;
            } else {
              // Success!
              vm.result = data;
              vm.$log.debug('Upload Done');
              vm.answer(vm.result);
            }
          })
            .on('httpUploadProgress', function (progress) {
              // Log Progress Information
              this.progress = parseInt(100.0 * progress.loaded / progress.total);
            });
        }
      }

    }
  }

  angular.module('App').service('PhotoUploadService', PhotoUploadService);
}
