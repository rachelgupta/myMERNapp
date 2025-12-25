const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
//Connection of mongoDB
//If /.. path is not present it will automatically create that Database
mongoose.connect('mongodb://127.0.0.1:27017/LearnMERN')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error", err));

//Schema
const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {
    timestamp: true
});

//Using schema via model. If user collection is not created, it creates them automatically
//Model name is added as collection
const User = mongoose.model('user', usersSchema);

app.post('/users', async (req, res) => {
    const body = req.body;
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });

    console.log("result", result);

    return res.status(201).json({ msg: "Success" });
});

app.get('/users', async(req, res) => {
    const dbuser = await User.find({});
    return res.json(dbuser);
});

app.route('/users/:id').get(async(req, res) => {
    const id = await User.findById(req.params.id);
    return res.json(id);
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.json({status:"Success"});
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});