'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const bandSchema = mongoose.Schema({
  name: { type:String, required:true },
  genre: { type:String, required:true },
});

export default mongoose.model('bands', bandSchema);