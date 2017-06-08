'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CertificateSchema = new Schema({
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
  jobTitle: {
    type: String,
    default: ''
  },
  jobTitleConfirmed: {
    type: String,
    default: ''
  },
  jobDescription: {
    type: String,
    default: ''
  },
  jobDescriptionConfirmed: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: ''
  },
  startDateConfirmed: {
    type: Date,
    default: ''
  },
  endDate: {
    type: Date,
    default: ''
  },
  endDateConfirmed: {
    type: Date,
    default: ''
  },
  jobDescription: {
    type: String,
    default: ''
  },
  jobDescriptionConfirmed: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Certificate', CertificateSchema);
