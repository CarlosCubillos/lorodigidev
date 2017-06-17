(function (app) {
  'use strict';

  app.registerModule('organizations', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('organizations.services');
}(ApplicationConfiguration));