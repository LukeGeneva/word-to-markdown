const assert = require("assert");
const path = require("path");
const wordToMarkdown = require("../wordToMarkdown");

const resolveTestFilePath = (filename) =>
  path.resolve(path.join(__dirname, filename));

describe("wordToMarkdown", () => {
  it("should convert a simple text string", async () => {
    const filePath = resolveTestFilePath("plain-text.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "Some plain text.");
  });

  it("should convert multiple paragraphs", async () => {
    const filePath = resolveTestFilePath("two-paragraphs.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "Two.\n\nParagraphs.");
  });

  it("should print bold text", async () => {
    const filePath = resolveTestFilePath("bold-text.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "*Bold text.*");
  });

  it("should print italic text", async () => {
    const filePath = resolveTestFilePath("italic-text.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "_Italic text._");
  });

  it("should combine styles", async () => {
    const filePath = resolveTestFilePath("bold-and-italic-text.docx");
    const output = await wordToMarkdown(filePath);
    assert.equal(output, "*_Bold and italic text._*");
  });
});
