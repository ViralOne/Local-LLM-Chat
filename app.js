const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/getChatResponse', async (req, res) => {
  const { userInput } = req.body;
  const systemInput = "You are an intelligent assistant. You always provide well-reasoned answers that are both correct and helpful.";

  try {
    const response = await axios.post('http://localhost:1234/v1/chat/completions', {
      messages: [{ role: 'system', content: systemInput },
                 { role: 'user', content: userInput }],
      temperature: 0.7,
      max_tokens: -1,
      stream: false,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = response.data.choices[0].message.content;
    res.send({ response: responseData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
