export function updatePreview(divContent) {
  try {
    const preview = document.getElementById('preview-content');
    if (!preview) {
      throw new Error('Preview div not found');
    }
    preview.innerHTML = divContent;
  } catch (error) {
    console.error(error);
  }
}

export function clearPreview() {
  const preview = document.getElementById('preview-content');
  if (preview) {
    preview.innerHTML = '';
  }
}