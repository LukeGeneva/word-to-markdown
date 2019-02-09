const StreamZip = require('node-stream-zip');
const convert = require('xml-js');

const fetchDocument = filePath =>
  new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: filePath,
      storeEntries: true
    });

    let xml = '';

    zip.on('ready', () => {
      zip.stream('word/document.xml', (err, docStream) => {
        if (err) {
          reject(err);
        }
        docStream.on('data', data => {
          xml += data;
        });
        docStream.on('end', () => {
          zip.close();
          const docJson = convert.xml2json(xml, { compact: false, spaces: 4 });
          resolve(JSON.parse(docJson));
        });
      });
    });
  });

module.exports = fetchDocument;
