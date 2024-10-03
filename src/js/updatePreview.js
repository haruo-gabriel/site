export function updatePreview(previewDiv, divContent) {
  try {
    if (!previewDiv) {
      throw new Error('Preview div not found');
    }
    previewDiv.innerHTML = divContent;
  } catch (error) {
    console.error(error);
  }
}

export function clearPreview(previewDiv) {
  if (previewDiv) {
    previewDiv.innerHTML = '';
  }
}