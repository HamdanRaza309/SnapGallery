import dotenv from 'dotenv'
// Load environment variables
dotenv.config();

import connectDB from './db/db.js'
import { app } from './app.js'

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Snap Gallery')
})

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log('MongoDB connection failed');
    })