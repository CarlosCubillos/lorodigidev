'use strict';

/**
 * Module dependencies
 */
var organizationsPolicy = require('../policies/organizations.server.policy'),
  organizations = require('../controllers/organization.server.controller');

module.exports = function (app) {
  // Organizations collection routes
  app.route('/api/organizations').all(organizationsPolicy.isAllowed)
    .get(organizations.list)
    .post(organizations.create);

  // Single organizations routes
  app.route('/api/organizations/:organizationId').all(organizationsPolicy.isAllowed)
    .get(organizations.read)
    .put(organizations.update)
    .delete(organizations.delete);

  // Organizations collection search
  app.route('/api/organizations/byName/:name').all(organizationsPolicy.isAllowed)
    .get(organizations.filterByName);

  // Finish by binding the organizations middleware
  app.param('organizationId', organizations.organizationByID);
  app.param('name', organizations.filterByName);
};
