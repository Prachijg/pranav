import express from 'express';
import bodyParser from 'body-parser';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.post('/generate', (req, res) => {
  const url = req.body.url;
  const qr_svg = qr.imageSync(url, { type: 'png' });
  const qr_base64 = qr_svg.toString('base64');
  fs.writeFile('URL.txt', url, (err) => {
    if (err) throw err;
    console.log('The URL has been saved to URL.txt');
  });
  res.json({ qrCode: qr_base64 });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
