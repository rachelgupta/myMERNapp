const express = require('express');

const { logReqRes } = require('./middleware')
const { connectMongoDb } = require('./connection');
const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

//Connection of mongoDB
//If /.. path is not present it will automatically create that Database
connectMongoDb('mongodb://127.0.0.1:27017/LearnMERN')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error", err));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

//Routes
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});