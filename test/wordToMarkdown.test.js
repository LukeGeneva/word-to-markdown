const assert = require("assert");
const path = require("path");
const wordToMarkdown = require("../wordToMarkdown");

const resolveTestFilePath = (filename) =>
  path.resolve(path.join(__dirname, filename));

describe("wordToMarkdown", () => {
  it("should convert a simple text string", async () => {
    const filePath = resolveTestFilePath("plain-text.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "Some plain text.\n");
  });

  it("should convert multiple paragraphs", async () => {
    const filePath = resolveTestFilePath("two-paragraphs.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "Two.\n\nParagraphs.\n");
  });
});
