(function () {
  'use strict';

  angular
    .module('organizations.services')
    .factory('OrganizationsService', OrganizationsService);

  OrganizationsService.$inject = ['$resource'];

  function OrganizationsService($resource) {

    var resource = $resource('api/organizations/:organizationId', {
      organizationId: '@_id'
    }, {
        query: { method: 'GET', params: { name: '@_name' }, isArray: true, url: 'api/organizations/byname/:name' },
        update: {
          method: 'PUT'
        }
      });

    self.getThemAll = function (query) {
        return resource.query({ name: angular.lowercase(query) });
    }

    return {
      getThemAll: getThemAll
    };
  }
}());