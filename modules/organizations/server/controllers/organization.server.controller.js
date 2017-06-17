'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an organization
 */
exports.create = function (req, res) {
  var organization = new Organization(req.body);
  organization.user = req.user;
  organization.state = "Solicitado";

  organization.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(organization);
    }
  });
};

exports.filterByName = function (req, res) {
  Organization.aggregate(
    [
      // Match first to reduce documents to those where the array contains the match
      {
        "$match": {
          "organizationName": { "$regex": req.params.name }
        }
      },

      // Unwind to "de-normalize" the document per array element
      { "$unwind": "$organizationName" },

      // Now filter those document for the elements that match
      {
        "$match": {
          "organizationName": { "$regex": req.params.name }
        }
      },

      // Group back as an array with only the matching elements
      {
        "$group": {
          "_id": "$_id",
          "organizationName": { "$first": "$organizationName" },
          "Id": { "$push": "$organizationId" }
        }
      }
    ],
    function (err, results) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(results);
      }
    }
  )


  // Organization.find().sort('-created').populate('user', 'displayName').exec(function (err, organizations) {
  //   if (err) {
  //     return res.status(422).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(organizations);
  //   }
  // });

}

/**
 * Show the current organization
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var organization = req.organization ? req.organization.toJSON() : {};

  // Add a custom field to the Organization, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  organization.isCurrentUserOwner = !!(req.user && organization.user && organization.user._id.toString() === req.user._id.toString());

  res.json(organization);
};

/**
 * Update an organization
 */
exports.update = function (req, res) {
  var organization = req.organization;

  organization.title = req.body.title;
  organization.content = req.body.content;

  organization.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(organization);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var organization = req.organization;

  organization.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(organization);
    }
  });
};

/**
 * List of Organizations
 */
exports.list = function (req, res) {
  Organization.find().sort('-created').populate('user', 'displayName').exec(function (err, organizations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(organizations);
    }
  });
};

/**
 * Organization middleware
 */
exports.organizationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Organization is invalid'
    });
  }

  Organization.findById(id).populate('user', 'displayName').exec(function (err, organization) {
    if (err) {
      return next(err);
    } else if (!organization) {
      return res.status(404).send({
        message: 'No certitificates with that identifier has been found'
      });
    }
    req.organization = organization;
    next();
  });
};
