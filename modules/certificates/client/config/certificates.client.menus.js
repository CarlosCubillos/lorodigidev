(function () {
  'use strict';

  angular
    .module('certificates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Mis certificados',
      state: 'certificates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'certificates', {
      title: 'Ver certificados',
      state: 'certificates.list',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'certificates', {
      title: 'Solicitar certificado',
      state: 'certificates.require',
      roles: ['*']
    });

  }
}());
