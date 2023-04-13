const axios = require('axios');
const fs = require('fs');

function downloadImage({ url, path }){
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: 'stream',
    }).then(response => {
      response.data.pipe(fs.createWriteStream(path));
      resolve(path);
    }).catch((error) => {
      reject(error);
    });
  });
}

module.exports = { downloadImage };