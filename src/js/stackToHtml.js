export function stackToHtml(stack) {
  let html = '';
  stack.forEach((element) => {
    html += element.string;
  });

  const mutable = document.getElementById('mutable');
  mutable.innerHTML = html;
}