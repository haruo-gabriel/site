document.addEventListener('DOMContentLoaded', (event) => { // Wait for the DOM to be fully loaded
  // Listen for the form submit event
  const form = document.querySelector('form');
  const promptInput = document.getElementById('prompt-text');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const promptMessage = promptInput.value;
    console.log(promptMessage);

    form.reset();
    promptInput.focus();
  });
});