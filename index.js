const path = require('path');
const express = require('express');
const fs = require('fs')
const { prompt } = require('./sendPromptCSV')

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"))
});

app.post('/query', async (req, res) => {
    try {
        const csv = req.body.csv;
        const question = req.body.prompt;

        if (!csv || !question) {
            res.status(400).json({ error: "Missing required parameters: csv, question" })
        } else {
            const filename  = path.parse(csv).base;
            const file = fs.readFileSync(path.join('data', filename), {'encoding':'utf8'})
            const answer = await prompt(question, file.toString()) 

            res.json(JSON.parse(answer))
        }

    } catch (error) {
        res.status(500).json({ error: "Cannot perform this operation" })
    }
});


app.listen(3000, 'localhost', ()=>console.log('http://localhost:3000/'))
