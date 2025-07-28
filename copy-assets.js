import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, 'public/classification-model.onnx');
const destination = path.join(__dirname, 'dist/classification-model.onnx');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Failed to copy ONNX file:', err);
  } else {
    console.log('✅ ONNX file copied to dist/');
  }
});
