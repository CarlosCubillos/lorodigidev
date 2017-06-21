(function () {
  'use strict';

  angular
    .module('organizations.services')
    .factory('ReqOrgInfoService', ReqOrgInfoService);

  ReqOrgInfoService.$inject = ['$resource'];

  function ReqOrgInfoService($resource) {

    var resource = $resource('api/reqorginfo/:reqorginfoId', {
      reqorginfoId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    return resource;
  }
}());