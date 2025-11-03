const path = require('path');
const express = require('express');
const env = require('dotenv').config(); // keep this if you have a .env
const app = express();
const staticRoutes = require('./routes/static');
// Set EJS as the view engine (make sure ejs is installed)
app.set('view engine', 'ejs');
// Ensure views path is correct
app.set('views', path.join(__dirname, 'views'));
// Serve public assets (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Keep your existing static routes (preserves current repo behavior)
app.use(staticRoutes);
// Index route (home view) - IMPORTANT for rubric (delivers dynamic home view)
app.get('/', (req, res) => {
  // render views/index.ejs — create this file if it doesn't exist
  res.render('index', { title: 'W01 Site - Home' });
});
// Health check (useful for Render or other hosts)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
const port = process.env.PORT || process.env.PORT_LOCAL || 5500;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});