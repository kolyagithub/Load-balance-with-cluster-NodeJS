/**
 * Created by qudrat on 05/10/16.
 */

const express = require('express')
    , otherRoutes = express.Router()
    , otherController = require('../controllers/other');


otherRoutes.get('/'  , otherController.getOther);

module.exports = otherRoutes;
