import { startPlaceholderAnimation, stopPlaceholderAnimation } from './animateResponsePlaceholder.js';
import { extractDiv } from './extractDiv.js';
import { stackToHtml } from './stackToHtml.js';
import { updatePreview, clearPreview } from './updatePreview.js';
import { sendPromptToServer } from './sendPromptToServer.js';

function disableSubmitButton(button) {
  button.disabled = true;
}

function enableSubmitButton(button) {
  button.disabled = false;
}

document.addEventListener('DOMContentLoaded', (event) => { // Wait for the DOM to be fully loaded
  // Listen for the form submit event
  const form = document.querySelector('form');
  const promptInput = document.getElementById('prompt');
  const responseText = document.getElementById('response');
  const submitButton = document.getElementById('prompt-button');
  const previewDiv = document.getElementById('preview-content');
  const insertButton = document.getElementById('insert-button');
  const undoButton = document.getElementById('undo-button');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const promptMessage = promptInput.value;
    console.log(promptMessage);

    startPlaceholderAnimation(responseText);
    disableSubmitButton(submitButton);
    clearPreview(previewDiv);

    try {
      // Espera a resposta do servidor
      await sendPromptToServer(promptMessage, responseText);

      // Aqui, a resposta já foi recebida com sucesso
      
      // Extrai a div do texto da resposta
      const extractedContent = extractDiv(responseText.value);
      console.log('Extracted div:', extractedContent);
      
      // Atualiza a prévia com o conteúdo extraído
      updatePreview(previewDiv, extractedContent);
      insertButton.disabled = false;
    } catch {
      responseText.value = 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.';
    } finally {
      stopPlaceholderAnimation(responseText);
      enableSubmitButton(submitButton);
    }

    form.reset();
    // promptInput.focus();
  });

  insertButton.addEventListener('click', (event) => {
    stack.push();
    stackToHtml(stack);
    insertButton.disabled = true;
    clearPreview(previewDiv);
  });

  undoButton.addEventListener('click', (event) => {
    stack.pop();
    stackToHtml(stack);
  });

});