const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../frontend/dist/index.html');
const destinationPath = path.join(__dirname, 'frontend/index.html');

fs.copyFileSync(sourcePath, destinationPath);