export function stackToHtml(stack) {
  let html = '';
  stack.forEach((element) => {
    html += element.string;
  });
}