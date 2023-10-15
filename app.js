const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./pet_family_tree.db');

app.use(cors());

app.get('/api/all-animals', (req, res) =>
{
    const query = 'SELECT * FROM Animal';

    db.all(query, (err, rows) =>
    {
        if (err)
        {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else
        {
            res.json(rows);
        }
    });
});

app.get('/api/male-animals', (req, res) =>
{
    const query = 'SELECT * FROM Animal WHERE Gender = "Male"';

    db.all(query, (err, rows) =>
    {
        if (err)
        {
            console.error('Error fetching male animals:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else
        {
            res.json(rows);
        }
    });
});

app.get('/api/female-animals', (req, res) =>
{
    const query = 'SELECT * FROM Animal WHERE Gender = "Female"';

    db.all(query, (err, rows) =>
    {
        if (err)
        {
            console.error('Error fetching female animals:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else
        {
            res.json(rows);
        }
    });
});

app.listen(port, () =>
{
    console.log(`Server is running at http://localhost:${port}`);
});
