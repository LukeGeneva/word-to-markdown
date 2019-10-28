const fetchDocument = require('./fetchDocument');

const elementToText = element => {
  if (element.type === 'text') return element.text;
  if (!element.elements) {
    if (element.name === 'w:t') return ' ';
    return '';
  }
  let prefix = '';
  return prefix + element.elements.map(elementToText).join('');
};

const wordToMarkdown = async filePath => {
  return new Promise((resolve, reject) => {
    fetchDocument(filePath).then(doc => {
      const markdown = elementToText(doc);
      resolve(markdown);
    });
  });
};

module.exports = wordToMarkdown;
