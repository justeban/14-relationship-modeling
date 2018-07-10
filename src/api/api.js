'use strict';

import express from 'express';
const router = express.Router();

import {finder, list} from '../middleware/models.js';
router.param('model', finder);

router.get('/api/v1/models', (req, res, next) => {
  sendJSON(list());
});
router.get('/api/v1/:model', (req, res, next) => {
  req.model.find({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/schema', (req, res, next) => {
  let schema = (typeof req.model.jsonSchema === 'function') ? req.model.jsonSchema() : {};
  sendJSON(res, schema);
});

router.post('/api/v1/:model', (req, res, next) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model.findOne({_id:req.params.id})
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  req.model.findByIdAndUpdate(req.params.id, req.body)
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model.findByIdAndDelete(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default router;