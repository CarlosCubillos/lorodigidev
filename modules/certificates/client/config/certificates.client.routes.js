(function () {
  'use strict';

  angular
    .module('certificates.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('certificates', {
        abstract: true,
        url: '/certificates',
        template: '<ui-view/>'
      })
      .state('certificates.list', {
        url: '',
        templateUrl: '/modules/certificates/client/views/list-certificates.client.view.html',
        controller: 'CertificatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Certificates List'
        }
      })
      .state('certificates.require', {
        url: '/require',
        templateUrl: '/modules/certificates/client/views/require-certificate.client.view.html',
        controller: 'CertificatesController',
        controllerAs: 'vm',
        resolve: {
          certificateResolve: newCertificate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Solicitar certificado'
        }
      })
      .state('certificates.confirmCertificateRequest', {
        url: '/confirmCertificateRequest/:certificateId',
        templateUrl: '/modules/certificates/client/views/confirm-certificateRequest.client.view.html',
        controller: 'CertificatesController',
        controllerAs: 'vm',
        resolve: {
          certificateResolve: getCertificate
        },
        data: {
          pageTitle: 'Confirmación de Solicitud'
        }
      });
  }

  getCertificate.$inject = ['$stateParams', 'CertificatesService'];

  function getCertificate($stateParams, CertificatesService) {
    return CertificatesService.get({
      certificateId: $stateParams.certificateId
    }).$promise;
  }

  newCertificate.$inject = ['CertificatesService'];

  function newCertificate(CertificatesService) {
    return new CertificatesService();
  }

}());
