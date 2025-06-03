document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const form = document.getElementById('explainer-form');
  const promptInput = document.getElementById('prompt');
  const temperatureInput = document.getElementById('temperature');
  const temperatureValue = document.getElementById('temp-value');
  const modelSelect = document.getElementById('model');
  const submitBtn = document.getElementById('submit-btn');
  const explanationOutput = document.getElementById('explanation');
  const loadingIndicator = document.getElementById('loading');

  // Update temperature value display
  temperatureInput.addEventListener('input', () => {
    temperatureValue.textContent = temperatureInput.value;
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const prompt = promptInput.value.trim();
    if (!prompt) {
      alert('Please enter a concept to explain');
      return;
    }
    
    // Show loading indicator and disable submit button
    loadingIndicator.classList.remove('hidden');
    submitBtn.disabled = true;
    explanationOutput.textContent = 'Generating explanation...';
    
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          temperature: temperatureInput.value,
          model: modelSelect.value
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate explanation');
      }
      
      const data = await response.json();
      explanationOutput.textContent = data.explanation;
      
    } catch (error) {
      console.error('Error:', error);
      explanationOutput.textContent = `Error: ${error.message}`;
      explanationOutput.style.color = 'red';
    } finally {
      // Hide loading indicator and re-enable submit button
      loadingIndicator.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });

  // Check if Ollama is running and available
  async function checkOllamaStatus() {
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'test',
          temperature: 0.7,
          model: 'llama3'
        }),
      });
      
      if (response.ok) {
        console.log('Connected to Ollama successfully');
      } else {
        const errorText = document.createElement('div');
        errorText.classList.add('error-banner');
        errorText.textContent = 'Warning: Could not connect to Ollama. Make sure Ollama is running on your machine.';
        document.querySelector('.container').prepend(errorText);
      }
    } catch (error) {
      console.error('Ollama connection error:', error);
      const errorText = document.createElement('div');
      errorText.classList.add('error-banner');
      errorText.textContent = 'Warning: Could not connect to Ollama. Make sure Ollama is running on your machine.';
      document.querySelector('.container').prepend(errorText);
    }
  }

  // Wait a bit before checking Ollama status to allow server to start
  setTimeout(checkOllamaStatus, 2000);
}); 