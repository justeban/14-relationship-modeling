'use strict';

import mongoose from 'mongoose';

const bandSchema = mongoose.Schema({
  name: { type:String, required:true },
  members: [{ type:mongoose.Schema.Types.ObjectId, ref: 'bandmates' }],
  genre: { type:String, required:true },
});

bandSchema.pre('findOne', function (next) {
  this.populate('members');
  next();
});

export default mongoose.model('bands', bandSchema);