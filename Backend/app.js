const express = require('express');
const dbConnection = require('./config/db');
const { authRouter } = require('./routes/authRoutes');
const { userRouter } = require('./routes/userRoutes');
const { chatRouter } = require('./routes/chatRoutes');
const app = express();
require('dotenv').config();

// body parser
app.use(express.json());

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

app.get('/', (req, res)=>{
    res.send('Whatsapp Clone');
});

const PORT = process.env.PORT || 5000;
const initalizeConnection = async()=>{
    try {
        await Promise.all([ dbConnection() ]);
        console.log('DB Connected');

        app.listen(PORT, ()=>{
            console.log(`Server is listening on PORT ${PORT}`);
        });
    } catch (err) {
        console.log("Error " + err);
    }
};
initalizeConnection();