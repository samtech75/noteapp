const express = require ('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongodb
connectDB();
//home sever
app.get('/', (req, res) => {
    res.send('hello note app')
});


app.use('/api/notes',noteRoutes);

app.listen(4000, () => {
    console.log('server is running')
});