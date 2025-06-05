const { v4: uuidv4 } = require('uuid');

const PRIORITY_ORDER = { HIGH: 1, MEDIUM: 2, LOW: 3 };

let jobQueue = [];
let store = {};

function enqueue(ids, priority, ingestion_id) {
  const batches = [];
  for (let i = 0; i < ids.length; i += 3) {
    const batch = {
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start',
      priority,
      created_at: new Date(),
      ingestion_id,
    };
    batches.push(batch);
  }

  jobQueue.push(...batches);

  store[ingestion_id] = {
    ingestion_id,
    status: 'yet_to_start',
    batches: batches.map((b) => ({
      batch_id: b.batch_id,
      ids: b.ids,
      status: b.status,
    })),
  };
}

function getNextBatch() {
  if (jobQueue.length === 0) return null;

  jobQueue.sort((a, b) => {
    const p1 = PRIORITY_ORDER[a.priority];
    const p2 = PRIORITY_ORDER[b.priority];
    if (p1 !== p2) return p1 - p2;
    return new Date(a.created_at) - new Date(b.created_at);
  });

  return jobQueue.shift();
}
module.exports = {
  store,
  enqueue,
  getNextBatch,
};
