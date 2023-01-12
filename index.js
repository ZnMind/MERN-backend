require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/:movies?/:year?', async (req, res) => {
    const client = new MongoClient(process.env.URI);
    const year = req.params.year;
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const cursor = await movies.find({ year: parseInt(year) }).toArray();
        res.send(cursor);
    } finally {
        await client.close();
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port: ${port}`))

module.exports = app;