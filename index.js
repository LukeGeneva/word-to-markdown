const fetchDocument = require('./fetchDocument');

const filePath = process.argv[2];

const elementToText = element => {
  if (element.type === 'text') return element.text;
  if (!element.elements) {
    if (element.name === 'w:t') return ' ';
    return '';
  }
  let prefix = '';
  if (element.name === 'w:p') prefix = '\n\n';
  return prefix + element.elements.map(elementToText).join('');
};
// looking for <w:t>

fetchDocument(filePath).then(doc => {
  const markdown = elementToText(doc);
  console.log(markdown);
});
