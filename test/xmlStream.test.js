const assert = require('chai').assert;
const XmlStream = require('../XmlStream');

const xml = `<greeting>Hello, world!</greeting>`;

describe('XmlStream', () => {
  it('should emit a specific tag', done => {
    const xmlStream = new XmlStream();
    xmlStream.on('tag', tag => {
      assert.deepEqual(tag, { name: 'greeting' });
      xmlStream.on('end', () => done());
    });
    xmlStream.on('data', data => console.log(data));
    xmlStream.write(xml);
    xmlStream.end();
  });
});

// change
