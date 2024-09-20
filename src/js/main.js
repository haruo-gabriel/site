document.addEventListener('DOMContentLoaded', (event) => { // Wait for the DOM to be fully loaded
  // Listen for the form submit event
  const form = document.querySelector('form');
  const promptInput = document.getElementById('prompt-text');
  const responseText = document.getElementById('response-text');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const promptMessage = promptInput.value;
    console.log(promptMessage);

    // Send the prompt to the Python server
    console.log('Sending prompt to server...');

    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: promptMessage })
    });

    const data = await response.json();
    responseText.value = data.answer;

    console.log(data);

    form.reset();
    // promptInput.focus();
  });
});