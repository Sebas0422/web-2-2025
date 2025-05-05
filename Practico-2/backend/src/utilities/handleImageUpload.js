import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../public/images');

fs.mkdirSync(uploadDir, { recursive: true });

export const handleImageUpload = (imageFile, id) => {
  return new Promise((resolve, reject) => {
    if (!imageFile) {
      reject('No image file uploaded');
      return;
    }

    const imageName = `${id}-genre.jpg`;
    const imagePath = path.join(uploadDir, imageName);

    imageFile.mv(imagePath, (err) => {
      if (err) {
        reject('Error uploading image: ' + err.message);
      } else {
        resolve(`/images/${imageName}`);
      }
    });
  });
};
