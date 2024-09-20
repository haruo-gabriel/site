let placeholderInterval;

export function startPlaceholderAnimation(textarea) {
  let dots = 0;
  placeholderInterval = setInterval(() => {
    dots = (dots + 1) % 4; // Cycle through 0, 1, 2, 3
    const placeholderText = 'Maritaca pensando' + '.'.repeat(dots);
    textarea.placeholder = placeholderText;
  }, 300); // Update every 300ms
}

export function stopPlaceholderAnimation(textarea) {
  clearInterval(placeholderInterval);
  textarea.placeholder = 'Maritaca pensando...'; // Reset to the original placeholder
}