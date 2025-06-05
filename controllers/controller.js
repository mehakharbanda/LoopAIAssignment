const { v4: uuidv4 } = require('uuid');
const { enqueue } = require('../models/jobQueue');
const store = require('../models/jobQueue').store;

const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];

exports.ingestData = (req, res) => {
  const { ids, priority } = req.body;
  if (!Array.isArray(ids) || !PRIORITY.includes(priority)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const ingestion_id = uuidv4();
  enqueue(ids, priority, ingestion_id);

  res.json({ ingestion_id });
};

exports.getStatus = (req, res) => {
  const { ingestion_id } = req.params;
  if (!store[ingestion_id]) {
    return res.status(404).json({ error: 'Ingestion ID not found' });
  }
  res.json(store[ingestion_id]);
};
