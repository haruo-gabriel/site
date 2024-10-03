export function updatePreview(divContent) {
  const preview = document.getElementById('preview');
  if (!preview) {
    console.error('Preview element not found');
    return;
  }
  preview.innerHTML = divContent;
}