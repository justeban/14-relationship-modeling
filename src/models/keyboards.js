'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const keysSchema = mongoose.Schema({
  brand: { type: String, uppercase: true, required: true },
  model: { type: String, uppercase: true, required: true },
  price: { type: Number, required: true },
  keys: { type: Number, required: true },
});

export default mongoose.model('keys', keysSchema);