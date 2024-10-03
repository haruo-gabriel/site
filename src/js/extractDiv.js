// const textoTeste = "...html <div> <p>Isso é um paragrafo</p> </div>";
// const pattern = /<div>(.*?)<\/div>/g;

// const matches = textoTeste.match(pattern).map(match => match.replace(/<\/?div>/g, ''));
// console.log(matches);

// const resp = "<div>" + matches[0] + "</div>"

export function extractDiv(text) {
  // Pattern to match the entire <div>...</div> block, including nested <div> elements
  // Regex para capturar o conteúdo da primeira div até o último </div>
  const regex = /<div\b[^>]*>(.*)<\/div/is;
  try {
    const match = regex.exec(text);
    if (!match) {
      throw new Error('No matches found');
    }
    return match[1];
  } catch (error) {
    console.error('Error extracting div content:', error);
    return null;
  }
}