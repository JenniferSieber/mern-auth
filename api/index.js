import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
dotenv.config();
const PORT = process.env.PORT || 5050;

// create app
const app = express();

// middleware 
app.use(express.json())

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(err => console.log(err));


// routes  
app.use('/api/user', userRoutes)

// server listen
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}!`));


