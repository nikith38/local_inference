const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Ollama } = require('ollama');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Ollama client
const ollama = new Ollama();

// Log file path
const logFile = path.join(__dirname, 'logs', 'explanations.log');

// Ensure logs directory exists
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
  fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
}

// API endpoint for explanations
app.post('/api/explain', async (req, res) => {
  try {
    const { prompt, temperature = 0.7, model = 'llama3' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Log the request
    const timestamp = new Date().toISOString();
    const requestLog = `[${timestamp}] REQUEST: ${prompt}\n`;
    fs.appendFileSync(logFile, requestLog);

    console.log(`Processing explanation request: "${prompt}"`);
    
    // Call local LLM
    const response = await ollama.generate({
      model: model,
      prompt: `Explain the following concept in simple words: ${prompt}`,
      temperature: parseFloat(temperature),
    });

    const explanation = response.response;

    // Log the response
    const responseLog = `[${timestamp}] RESPONSE: ${explanation}\n\n`;
    fs.appendFileSync(logFile, responseLog);

    res.json({ explanation });
  } catch (error) {
    console.error('Error generating explanation:', error);
    
    // Log the error
    const timestamp = new Date().toISOString();
    const errorLog = `[${timestamp}] ERROR: ${error.message}\n\n`;
    fs.appendFileSync(logFile, errorLog);
    
    res.status(500).json({ error: error.message });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 