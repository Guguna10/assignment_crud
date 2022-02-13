import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import Routes from './routes/route.js';
const app = express();

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', Routes);

const PORT = 8000;
const URL = "mongodb+srv://demetre:aleksandre@cluster0.bkmng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => { 
  
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
}).catch((error) => {
    console.log('Error:', error.message)
})