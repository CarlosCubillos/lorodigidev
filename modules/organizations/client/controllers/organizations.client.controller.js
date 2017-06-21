(function () {
  'use strict';

  angular
    .module('organizations')
    .controller('OrganizationsController', OrganizationsController);

  OrganizationsController.$inject = ['$log', '$scope', '$state', 'organizationResolve', '$window', 'Authentication', 'OrganizationsService'];

  function OrganizationsController($log, $scope, $state, organization, $window, Authentication, OrganizationsService) {
    var vm = this;

    vm.organization = organization;
    vm.organization.termsAndConditionsAcceptance = false;
    vm.authentication = Authentication;
    vm.error = null;
    vm.organizationForm = {};
    vm.remove = remove;
    vm.save = save;

    //vm.states = loadAll()
    // vm.organizationFound = false;
    // vm.mdAutocompleteIsDisabled = false;
    // vm.mdAutocompleteNoCache = false;

    // vm.mdAutocompleteQuerySearch = mdAutocompleteQuerySearch;
    // vm.mdAutocompleteSelectedItemChange = mdAutocompleteSelectedItemChange;
    // vm.mdAutocompleteSearchTextChange = mdAutocompleteSearchTextChange;

    // Remove existing Certificate
    function remove() {
      if ($window.confirm('Estás seguro de querer borrar la organización?')) {
        vm.organization.$remove($state.go('articles.list'));
      }
    }

    // Save Certificat's requirement


    // function mdAutocompleteQuerySearch(query) {
    //   if (query == "")
    //     query = "*";

    //   return OrganizationsService.getThemAll(query).$promise;


    //   // var results = vm.states.filter(createFilterFor(query));

    //   // var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
    //   //   deferred;
    //   // return results;

    //   // OrganizationsService.query({ name: query }, function (data) {

    //   // var results = data.map(function (organization) {
    //   //   return {
    //   //     value: organization.organizationName,
    //   //     display: organization.organizationName
    //   //   }
    //   // });

    //   // return results;

    //   // }, function (err) {
    //   //   //your code
    //   //   $log.error(err);
    //   // });

    //   // return results.$promise;

    // }


    // function mdAutocompleteSearchTextChange(text) {
    //   $log.info('Text changed to ' + text);
    // }

    // function mdAutocompleteSelectedItemChange(item) {
    //   if (item) {
    //     vm.organizationFound = true;
    //     $log.info('Item changed to ' + JSON.stringify(item));
    //   }
    //   else
    //     vm.organizationFound = false;
    // }

    // function createFilterFor(query) {
    //   var lowercaseQuery = angular.lowercase(query);

    //   return function filterFn(state) {
    //     return (state.value.indexOf(lowercaseQuery) === 0);
    //   };

    // }


  }
}());