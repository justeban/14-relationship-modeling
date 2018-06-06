'use strict';

import mongoose from 'mongoose';

const guitarSchema = mongoose.Schema({
  brand: { type: String, uppercase: true, required: true },
  model: { type: String, uppercase: true, required: true },
  price: { type: Number, required: true },
  strings: { type: Number, default: 6, enum: [4, 6, 12] }
});

export default mongoose.model('guitars', guitarSchema);