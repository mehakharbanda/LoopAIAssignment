const axios = require('axios');

(async () => {
  const res1 = await axios.post('http://localhost:5000/ingest', {
    ids: [1, 2, 3, 4, 5],
    priority: 'MEDIUM',
  });
  console.log('Ingestion ID 1:', res1.data.ingestion_id);

  setTimeout(async () => {
    const res2 = await axios.post('http://localhost:5000/ingest', {
      ids: [6, 7, 8, 9],
      priority: 'HIGH',
    });
    console.log('Ingestion ID 2:', res2.data.ingestion_id);
  }, 4000);
})();
