import axios from 'axios';
import fs from 'fs';

async function downloadImage(data: { url: string, path: string }): Promise<string> {
  try {
    const response = await axios({
      url: data.url,
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(data.path);
    response.data.pipe(writer);
    return new Promise<string>((resolve, reject) => {
      writer.on('finish', () => resolve(data.path));
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download image from ${data.url}: ${error}`);
  }
}

export { downloadImage };