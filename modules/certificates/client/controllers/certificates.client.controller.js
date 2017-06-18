(function () {
  'use strict';

  angular
    .module('certificates')
    .controller('CertificatesController', CertificatesController);

  CertificatesController.$inject = ['$log', '$scope', '$state', 'certificateResolve', '$window', 'Authentication', 'CertificatesService', 'OrganizationsService'];

  function CertificatesController($log, $scope, $state, certificate, $window, Authentication, CertificatesService, OrganizationsService) {
    var vm = this;

    vm.certificate = certificate;
    vm.certificate.termsAndConditionsAcceptance = false;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.states = loadAll()
    vm.mdAutocompleteIsDisabled = false;
    vm.mdAutocompleteNoCache = true;

    vm.mdAutocompleteQuerySearch = mdAutocompleteQuerySearch;
    vm.mdAutocompleteSelectedItemChange = mdAutocompleteSelectedItemChange;
    vm.mdAutocompleteSearchTextChange = mdAutocompleteSearchTextChange;

    // Remove existing Certificate
    function remove() {
      if ($window.confirm('Estás seguro de querer borrar el certificado?')) {
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
        $state.go('certificates.confirmCertificateRequest', {
          certificateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function mdAutocompleteQuerySearch(query) {

      return OrganizationsService.getThemAll(query).$promise;

      

      // var results = vm.states.filter(createFilterFor(query));

      // var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
      //   deferred;
      // return results;

      // OrganizationsService.query({ name: query }, function (data) {

        // var results = data.map(function (organization) {
        //   return {
        //     value: organization.organizationName,
        //     display: organization.organizationName
        //   }
        // });

        // return results;

      // }, function (err) {
      //   //your code
      //   $log.error(err);
      // });

      // return results.$promise;

    }


    function mdAutocompleteSearchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function mdAutocompleteSelectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }


    /**
         * Build `states` list of key/value pairs
         */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map(function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }


    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }


  }
}());