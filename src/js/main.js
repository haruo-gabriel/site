import { startPlaceholderAnimation, stopPlaceholderAnimation } from './animateResponsePlaceholder.js';
import { extractDiv } from './extractDiv.js';
import { updatePreview, clearPreview } from './updatePreview.js';
import { sendPromptToServer } from './sendPromptToServer.js';


function disableSubmitButton(button) {
  button.disabled = true;
}

function enableSubmitButton(button) {
  button.disabled = false;
}

function hideInsertButton(button) {
  button.style.display = 'none';
}

function showInsertButton(button) {
  button.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', (event) => { // Wait for the DOM to be fully loaded
  // Listen for the form submit event
  const form = document.querySelector('form');
  const promptInput = document.getElementById('prompt');
  const responseText = document.getElementById('response');
  const submitButton = document.getElementById('prompt-button');
  const fixButton = document.getElementById('fix-button');
  const previewDiv = document.getElementById('preview-content');
  const insertButton = document.getElementById('insert-button');
  const insertFixButton = document.getElementById('insert-fix-button');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const promptMessage = promptInput.value;
    console.log(promptMessage);

    startPlaceholderAnimation(responseText);
    disableSubmitButton(submitButton);
    disableSubmitButton(fixButton);
    clearPreview(previewDiv);

    try {
      // Espera a resposta do servidor
      await sendPromptToServer(promptMessage, responseText, 'generate', null);

      // Aqui, a resposta já foi recebida com sucesso
      
      // Extrai a div do texto da resposta
      const extractedContent = extractDiv(responseText.value);
      console.log('Extracted div:', extractedContent);
      
      // Atualiza a prévia com o conteúdo extraído
      updatePreview(previewDiv, extractedContent);
    } catch {
      responseText.value = 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.';
    } finally {
      stopPlaceholderAnimation(responseText);
      enableSubmitButton(submitButton);
      enableSubmitButton(fixButton);
      hideInsertButton(insertFixButton);
      showInsertButton(insertButton);
    }

    form.reset();
    // promptInput.focus();
  });


  fixButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const promptMessage = promptInput.value;
    console.log(promptMessage);

    startPlaceholderAnimation(responseText);
    disableSubmitButton(submitButton);
    disableSubmitButton(fixButton);
    clearPreview(previewDiv);

    try {
      // Espera a resposta do servidor
      
      console.log(document.getElementById("mutable").innerHTML);
      await sendPromptToServer(promptMessage, responseText, 'fix', document.getElementById("mutable").innerHTML);

      // Aqui, a resposta já foi recebida com sucesso
      
      // Atualiza a prévia com o conteúdo extraído
      updatePreview(previewDiv, responseText.value);
    } catch {
      responseText.value = 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.';
    } finally {
      stopPlaceholderAnimation(responseText);
      enableSubmitButton(submitButton);
      enableSubmitButton(fixButton);
      hideInsertButton(insertButton);
      showInsertButton(insertFixButton);
    }

    form.reset();
    // promptInput.focus();
  });
});