'use strict';

import mongoose from 'mongoose';
import Bands from './bands';

const bandmateSchema = mongoose.Schema({
  name: {type:String, required:true},
  instrument: {type:String, required:true},
  band: {type:mongoose.Schema.Types.ObjectId, required: true, ref: 'bands' },
});

bandmateSchema.pre('findOne', function(next) {
  this.populate('band');
  next();
});

bandmateSchema.pre('save', function(next) {
  let mateId = this._id;
  let bandId = this.band;
  Bands.findById(bandId)
    .then(band => {
      if (!band) {
        return Promise.reject('Invalid Team Specified');
      } else {
        Bands.findOneAndUpdate(
          { _id: bandId },
          { $addToSet: { members: mateId } }
        )
          .then(Promise.resolve())
          .catch(err => Promise.reject(err));
      }
    })
    .then(next())
    .catch(next);
});

export default mongoose.model('bandmates', bandmateSchema);