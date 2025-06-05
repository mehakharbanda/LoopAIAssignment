const express = require('express');
const router = express.Router();
const { ingestData, getStatus } = require('../controllers/controller');

router.post('/ingest', ingestData);
router.get('/status/:ingestion_id', getStatus);

module.exports = router;
