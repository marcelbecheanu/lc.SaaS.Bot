import axios from 'axios';
import fs from 'fs';

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

export { downloadImage }