const express = require('express');

//When using routing in another file we use router instead of app. feature of express
const router = express.Router();

const {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handlePostUser,
} = require('../controllers/user.js');

router.route('/').post(handlePostUser).get(handleGetAllUsers);

router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handlePatchUserById)
    .delete(handleDeleteUserById);

module.exports = router;