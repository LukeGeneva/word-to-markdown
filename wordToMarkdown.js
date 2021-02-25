const fetchDocument = require("./fetchDocument");

const elementToText = (element, markdown = "") => {
  let childText = "";
  if (!element) return markdown;
  if (element.elements)
    childText = element.elements.map((e) => elementToText(e)).join("");
  let elementText = "";
  if (element.type === "text") elementText = element.text;
  if (element.name === "w:p") elementText = "\n";
  return childText + elementText;
};

const wordToMarkdown = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetchDocument(filePath).then((doc) => {
      const markdown = elementToText(doc);
      resolve(markdown);
    });
  });
};

module.exports = wordToMarkdown;
