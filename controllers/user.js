const User = require('../models/user.js');

async function handleGetAllUsers(req, res) {
    const dbuser = await User.find({});
    return res.json(dbuser);
}

async function handleGetUserById(req, res) {
    const id = await User.findById(req.params.id);
    return res.json(id);
}

async function handlePatchUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handlePostUser(req, res) {
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
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handlePostUser,
}