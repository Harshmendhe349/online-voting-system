// pages/api/elections.js

import { connectToDatabase } from '../../db/dbConfig';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, date, description } = req.body;

    const db = await connectToDatabase();
    const electionsCollection = db.collection('elections');

    try {
      const newElection = await electionsCollection.insertOne({
        title,
        date,
        description,
        votes: 0,
      });

      res.status(201).json({ message: 'Election created successfully', election: newElection });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create election', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
