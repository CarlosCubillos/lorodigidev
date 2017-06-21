(function () {
  'use strict';

  angular
    .module('organizations.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('organizations', {
        abstract: true,
        url: '/organizations',
        template: '<ui-view/>'
      })
      .state('organizations.list', {
        url: '',
        templateUrl: '/modules/organizations/client/views/list-organizations.client.view.html',
        controller: 'OrganizationsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Organizations List'
        }
      })
      .state('organizations.requestOrganizationConctactInfo', {
        url: '/requestorginfo',
        templateUrl: '/modules/organizations/client/views/request-organizationContactInfo.client.view.html',
        controller: 'ReqOrgInfoController',
        controllerAs: 'vm',
        resolve: {
          reqOrgInfoResolve: newReqOrgInfo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Solicitar información de contacto'
        }
      });
    // .state('organizations.confirmOrganizationRequest', {
    //   url: '/confirmOrganizationRequest/:organizationId',
    //   templateUrl: '/modules/organizations/client/views/confirm-organizationRequest.client.view.html',
    //   controller: 'OrganizationsController',
    //   controllerAs: 'vm',
    //   resolve: {
    //     organizationResolve: getOrganization
    //   },
    //   data: {
    //     pageTitle: 'Confirmación de Solicitud'
    //   }
    // });
  }

  // getOrganization.$inject = ['$stateParams', 'OrganizationsService'];

  // function getOrganization($stateParams, OrganizationsService) {
  //   return OrganizationsService.get({
  //     organizationId: $stateParams.organizationId
  //   }).$promise;
  // }

  newReqOrgInfo.$inject = ['ReqOrgInfoService'];

  function newReqOrgInfo(ReqOrgInfoService) {
    return new ReqOrgInfoService();
  }

}());
