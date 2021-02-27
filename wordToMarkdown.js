const fetchDocument = require("./fetchDocument");

const renderDocument = (document) => {
  const documentNode = document.elements.find((e) => e.name === "w:document");
  const body = documentNode.elements.find((e) => e.name === "w:body");
  return renderBody(body);
};

const renderBody = (body) => {
  const paragraphs = body.elements.filter((e) => e.name === "w:p");
  return paragraphs.map(renderParagraph).join("\n");
};

const renderParagraph = (paragraph) => {
  const runs = paragraph.elements.filter((e) => e.name === "w:r");
  return runs
    .map(renderRun)
    .join("")
    .replace(/\*{4}/g, "**");
};

const renderRun = (run) => {
  const tElement = run.elements.find((e) => e.name === "w:t");
  if (!tElement) return "";
  const textElement = tElement.elements.find((e) => e.type === "text");
  const text = textElement ? textElement.text : "";
  return renderText(getStyle(run), text);
};

const renderText = (style, text) => {
  let wrap = "";
  if (style.isBold) wrap += "**";
  if (style.isItalic) wrap += "*";
  const reverseWrap = wrap
    .split("")
    .reverse()
    .join("");
  return wrap + text + reverseWrap;
};

const getStyle = (run) => {
  const rPr = run.elements.find((e) => e.name === "w:rPr");
  const isBold = !!rPr.elements.find((e) => e.name === "w:b");
  const isItalic = !!rPr.elements.find((e) => e.name === "w:i");
  return { isBold, isItalic };
};

const wordToMarkdown = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetchDocument(filePath).then((doc) => {
      const markdown = renderDocument(doc);
      resolve(markdown);
    });
  });
};

module.exports = wordToMarkdown;
