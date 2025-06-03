# Concept Explainer App

A simple web application that explains concepts in simple words using a local LLM (Language Model) running on your machine.

## App Type

This is an **Explainer App** that takes a concept or term as input and generates an explanation in simple terms using a locally running LLM.

## Features

- Input box for entering concepts to explain
- Adjustable temperature setting to control output randomness
- Model selection (supports various local models)
- Loading UI during generation
- Output logging to local files
- Responsive design for desktop and mobile

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- [Ollama](https://ollama.ai/) installed and running on your machine

## Models Supported

This app is designed to work with any model available in Ollama, including:
- Llama 3
- Mistral
- Gemma
- And any other model you have pulled to your Ollama installation

## Setup Instructions

1. **Install Ollama**
   
   First, you need to install Ollama on your machine. Visit [https://ollama.ai/](https://ollama.ai/) and follow the installation instructions for your operating system.

2. **Pull a Model**
   
   After installing Ollama, pull at least one model. Open your terminal and run:
   ```
   ollama pull llama3
   ```
   
   You can also pull other models like:
   ```
   ollama pull mistral
   ollama pull gemma
   ```

3. **Install Dependencies**
   
   Navigate to the project directory and install the required dependencies:
   ```
   cd explainer-app
   npm install
   ```

4. **Start the Server**
   
   Start the application:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. **Access the App**
   
   Open your web browser and go to:
   ```
   http://localhost:3000
   ```

## How to Use

1. Enter a concept or term you want explained in the input box
2. Adjust the temperature slider if desired (lower for more focused responses, higher for more creative ones)
3. Select the model you want to use from the dropdown
4. Click "Explain" and wait for the response
5. The explanation will appear in the output section

## Logs

All explanations are logged to the `logs/explanations.log` file in the application directory. This includes:
- Timestamp
- User prompt
- Generated explanation
- Any errors that occur

## Troubleshooting

- Make sure Ollama is running before starting the app
- If you get connection errors, check that Ollama is properly installed and running
- For model-specific errors, make sure you've pulled the model you're trying to use

## License

MIT 