let placeholderInterval;

function adjustTextareaHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

export function startPlaceholderAnimation(textArea) {
  // Clear the response box before processing the animation
  adjustTextareaHeight(textArea);
  textArea.value = '';

  let dots = 0;
  placeholderInterval = setInterval(() => {
    dots = (dots + 1) % 4; // Cycle through 0, 1, 2, 3
    const placeholderText = 'Maritaca pensando' + '.'.repeat(dots);
    textArea.placeholder = placeholderText;
  }, 300); // Update every 300ms
}

export function stopPlaceholderAnimation(textArea) {
  clearInterval(placeholderInterval);
  adjustTextareaHeight(textArea);
  textArea.placeholder = 'Maritaca pensando...'; // Reset to the original placeholder
}