import { startPlaceholderAnimation, stopPlaceholderAnimation } from './animateResponsePlaceholder.js';

function adjustTextareaHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function disableSubmitButton(button) {
  button.disabled = true;
}

function enableSubmitButton(button) {
  button.disabled = false;
}

async function sendPromptToServer(promptMessage, responseText) {
  console.log('Sending prompt to server...');
  try {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: promptMessage })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    responseText.value = data.answer;
    console.log('Received response from server:');
    console.log(data);
  } catch (error) {
    console.error('Network error:', error);
  }
}

document.addEventListener('DOMContentLoaded', (event) => { // Wait for the DOM to be fully loaded
  // Listen for the form submit event
  const form = document.querySelector('form');
  const promptInput = document.getElementById('prompt');
  const responseText = document.getElementById('response');
  const submitButton = document.getElementById('prompt-button');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const promptMessage = promptInput.value;
    console.log(promptMessage);

    startPlaceholderAnimation(responseText);
    disableSubmitButton(submitButton);

    await sendPromptToServer(promptMessage, responseText);

    stopPlaceholderAnimation(responseText);
    adjustTextareaHeight(responseText);
    enableSubmitButton(submitButton);

    form.reset();
    // promptInput.focus();
  });
});