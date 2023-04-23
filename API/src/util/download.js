const axios = require('axios');
const fs = require('fs');

async function downloadImage(data) {
  try {
    const response = await axios({
      url: data.url,
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(data.path);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(data.path));
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download image from ${data.url}: ${error}`);
  }
}

module.exports = { downloadImage };