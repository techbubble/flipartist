const express = require('express');
const app = express();
const path = require('path');
const fse = require('fs-extra');

require('dotenv').config({ path: './.env' });

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/api/artists', async (req, res) => {
  try {

    let artistFiles = fse.readdirSync(path.join(__dirname,'public','artists'));
    artists = [];
    artistFiles.forEach((file) => {
      if (file.endsWith('.png')) {
        artists.push(file.replace('.png',''));
      }
    });
    res.json(artists);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
});

app.listen(process.env.PORT, () => console.log(`Node server listening on port ${process.env.PORT}!`));

module.exports = app