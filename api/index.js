import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(err => console.log(err))
    
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}!`))