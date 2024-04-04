import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PersonInventory } from './models/personInventoryModel.js'; // Importing the Book model
import { fileURLToPath } from 'url';
import employeeRoute from './routes/employeeRoute.js';
import path from 'path';
import dotenv from 'dotenv';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to log response headers
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`Response headers for ${req.path}:`, res.getHeaders());
        return originalSend.call(this, body);
    };
    next();
});

console.log(`MongoDB URI: ${process.env.mongoDB_URI}`);

// Attempt to connect to MongoDB
mongoose.connect(process.env.mongoDB_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
};


//logging paths to console
const sourcePath = path.join(__dirname, 'frontend', 'dist', 'index.html');
const destinationPath = '/';

console.log('Source path:', sourcePath);
console.log('Destination path:', destinationPath);


app.get('/', (req, res) => res.send('Welcome to the Employee Inventory Management System!'));

app.use('/employee', employeeRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
