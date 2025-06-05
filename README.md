# LoopAIAssignment
# Data Ingestion API System

This project implements a simple asynchronous batch ingestion API system in Node.js using Express.

## Features

- POST /ingest: Submit list of IDs with a priority
- GET /status/:ingestion_id: Check status of all batches
- Processes only 3 IDs per batch with 1 batch every 5 seconds
- Prioritizes HIGH > MEDIUM > LOW based on time of creation
