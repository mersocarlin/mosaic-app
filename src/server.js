import express from 'express';
import path from 'path';
import multer from 'multer';

const app = express();

const port = process.env.PORT || 8765;

const upload = multer({
  dest: 'uploads/',
});

// Static files (js, css and images)
app.use('/js', express.static(path.join(__dirname, '../js/')));
app.use('/css', express.static(path.join(__dirname, '../css/')));
app.use('/images', express.static(path.join(__dirname, '../images/')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'mosaic.html'));
});

app.post('/upload', upload.single('fileMosaic'), (req, res) => {
  const { file } = req;

  res.json({
    path: file.path,
  });
});

app.listen(port, () => {
  /* eslint-disable no-console  */
  console.log(`mosaic server running on port ${port}`);
});
