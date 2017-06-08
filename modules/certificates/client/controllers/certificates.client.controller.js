(function () {
  'use strict';

  angular
    .module('certificates')
    .controller('CertificatesController', CertificatesController);

  CertificatesController.$inject = ['$scope', '$state', 'certificateResolve', '$window', 'Authentication'];

  function CertificatesController($scope, $state, certificate, $window, Authentication) {
    var vm = this;

    vm.certificate = certificate;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.certificate.$remove($state.go('articles.list'));
      }
    }

    // Save Certificat's requirement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.certificateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.certificate._id) {
        vm.certificate.$update(successCallback, errorCallback);
      } else {
        vm.certificate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('certificate.view', {
          certificateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
