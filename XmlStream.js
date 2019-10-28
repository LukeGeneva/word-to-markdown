const Transform = require('stream').Transform;

class XmlStream extends Transform {
  constructor() {
    super({
      transform: (chunk, encoding, callback) => {
        this.emit('tag', { name: 'greeting' });
        callback();
      }
    });
  }
}

module.exports = XmlStream;
