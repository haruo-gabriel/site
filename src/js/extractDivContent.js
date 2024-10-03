// const textoTeste = "...html <div> <p>Isso é um paragrafo</p> </div>";
// const pattern = /<div>(.*?)<\/div>/g;

// const matches = textoTeste.match(pattern).map(match => match.replace(/<\/?div>/g, ''));
// console.log(matches);

// const resp = "<div>" + matches[0] + "</div>"

export function extractDivContent(text) {
  const pattern = /<div>(.*?)<\/div>/g;
  const matches = text.match(pattern).map(match => match.replace(/<\/?div>/g, ''));
  return matches.length > 0 ? "<div>" + matches[0] + "</div>" : null;
}