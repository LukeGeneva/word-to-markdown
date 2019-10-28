const assert = require('assert');
const path = require('path');
const wordToMarkdown = require('../wordToMarkdown');

const resolveTestFilePath = filename =>
  path.resolve(path.join(__dirname, filename));

describe('wordToMarkdown', () => {
  it('should convert a simple text string', async () => {
    const filePath = resolveTestFilePath('test-text.docx');
    const output = await wordToMarkdown(filePath);
    assert.equal(output, 'Some plain text.');
  });
});
