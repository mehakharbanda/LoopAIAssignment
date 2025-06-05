const { getNextBatch, store } = require('../models/jobQueue');

const simulateFetch = (id) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id, data: 'processed' }), 1000)
  );

function updateStatus(ingestion_id) {
  const batchList = store[ingestion_id].batches;
  const statuses = batchList.map((b) => b.status);
  if (statuses.every((s) => s === 'completed')) {
    store[ingestion_id].status = 'completed';
  } else if (statuses.some((s) => s === 'triggered')) {
    store[ingestion_id].status = 'triggered';
  } else {
    store[ingestion_id].status = 'yet_to_start';
  }
}

function startWorker() {
  setInterval(async () => {
    const batch = getNextBatch();
    if (!batch) return;

    batch.status = 'triggered';
    const ref = store[batch.ingestion_id].batches.find(
      (b) => b.batch_id === batch.batch_id
    );
    ref.status = 'triggered';
    store[batch.ingestion_id].status = 'triggered';

    await Promise.all(batch.ids.map(simulateFetch));

    ref.status = 'completed';
    updateStatus(batch.ingestion_id);
  }, 5000);
}

module.exports = startWorker;
