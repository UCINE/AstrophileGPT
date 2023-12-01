// import express from 'express';
// import fetch from 'node-fetch';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));
// app.use(bodyParser.json());

// app.post('/chat', async (req, res) => {
//     const userMessage = req.body.message;
//     const userName = req.body.username || "the user"; 

//     const prompt = `.

//     ${userName}: "${userMessage}"
//     Astrophile:`;

//     try {
//         const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//             },
//             body: JSON.stringify({
//                 prompt: prompt,
//                 max_tokens: 150,
//                 temperature: 0.7,
//                 stop: ["\n", `${userName}:`]
//             })
//         });

//         const data = await response.json();

//         if (data.choices && data.choices.length > 0 && data.choices[0].text) {
//             let aiText = data.choices[0].text.trim();
//             aiText = aiText.replace(/^"|"$/g, '');
//             res.send({ reply: aiText });
//         } else {
//             console.error('Unexpected response structure from OpenAI:', data);
//             res.status(500).send('An error occurred in fetching the AI response.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('An error occurred');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const userName = req.body.username || "the user"; 

    const prompt = `When asked questions, provide helpful and concise answers.`;

    try {
        const response = await axios.post('https://api.cohere.ai/v1/generate', {
            model: 'command',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.9
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const aiText = response.data.generations[0].text.trim();
        res.send({ reply: aiText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
