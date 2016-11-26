/**
 * Created by qudrat on 05/10/16.
 */

const express = require('express')
    , userRoutes = express.Router()
    , usersController = require('../controllers/users');


userRoutes.get('/'  , usersController.getAll);

module.exports = userRoutes;
