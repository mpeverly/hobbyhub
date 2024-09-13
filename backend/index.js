const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// OpenAI API setup
const openai = new OpenAI({
  apiKey: 'sk-73VeN5f9gygTWJKstiJy42pmsjQhy9CaZdy4PDFvCfT3BlbkFJEyOlJwvtfvbaf6T5mFcoNf7lEoRNQnYQ_O63ZboLoA', // Replace with your actual API key
});

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003', // Or another GPT model
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({ message: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interacting with ChatGPT API');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
