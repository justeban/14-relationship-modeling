'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);
import Bands from './bands';

const bandmateSchema = mongoose.Schema({
  name: {type:String, required:true},
  instrument: {type:String, required:true},
}, { toJSON: { virtuals: true }, 
});

bandmateSchema.virtual('band', {
  ref: 'bands',
  localField: 'band',
  foreignField: 'name',
  justOne: false,
});

bandmateSchema.pre('findOne', function () {
  try {
    this.populate('band');
  }
  catch (e) {
    console.error('ERR', e);
  }
});

// bandmateSchema.pre('findOne', function(next) {
//   this.populate('band');
//   next();
// });

export default mongoose.model('bandmates', bandmateSchema);