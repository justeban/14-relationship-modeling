'use strict';

import requireAll from 'require-dir';

let models = requireAll(`${__dirname}/../models`);

const list = () => {
  return Object.keys(models);
};

const finder = (req, res, next) => {

  let model = req.params.model;

  if (model && models[model] && models[model].default) {
    req.model = models[model].default;
    next();
  }
  else {
    next(`Model ${model} Not Found`);
  }
};

export { finder, list };