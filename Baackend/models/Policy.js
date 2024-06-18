const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  effectiveDate: { type: Date },
  version: { type: Number },
  status: { type: String, enum: ['active', 'inactive'], required: true }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
