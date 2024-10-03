export async function sendPromptToServer(promptMessage, responseText) {
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