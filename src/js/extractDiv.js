// const textoTeste = "...html <div> <p>Isso é um paragrafo</p> </div>";
// const pattern = /<div>(.*?)<\/div>/g;

// const matches = textoTeste.match(pattern).map(match => match.replace(/<\/?div>/g, ''));
// console.log(matches);

// const resp = "<div>" + matches[0] + "</div>"

export function extractDiv(text) {
  // Pattern to match the entire <div>...</div> block, including nested <div> elements
  const pattern = /<div\b[^>]*>([\s\S]*?)<\/div>/gi;
  try {
    const matches = text.match(pattern);
    if (!matches) {
      throw new Error('No matches found');
    }
    // Return the first match
    return matches[0];
  } catch (error) {
    console.error('Error extracting div content:', error);
    return null;
  }
}