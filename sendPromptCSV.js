require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI();

async function prompt(message, csv) {
    const messages = [
        {role:'system', content: 'You will be given CSV data and the user will ask you to something with it. Returns the data in a JSON array'}, 
        {role:'user', content: csv},
        {role:'user', content: message}
    ]
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4",
    })

    return completion.choices[0].message.content
    
}

module.exports = { prompt }