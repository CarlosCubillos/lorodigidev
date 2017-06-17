'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var OrganizationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  organizationId: {
    type: String,
    default: ''
  },
  organizationName: {
    type: String,
    default: ''
  },
  contactPerson: {
    type: String,
    default: ''
  },
  phones: [{
    number: String,
    type: String
  }],
  address: {
    type: String
  },
  emails: [{
    address: String,
    descirption: String
  }],
  usesLoroDigi: {
    type: Boolean,
    default: false
  },
  legalState: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  RESTfulapi: {
    type: String,
    default: ''
  },
  termsAndConditionsAcceptance: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Organization', OrganizationSchema);
