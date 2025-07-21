const express = require("express");

const get_teachers = require("../../controllers/schooladmin/get_new_teachers__in_list");

const get_new_teachers_Routes = express.Router();

get_new_teachers_Routes.get("/show_List", get_teachers);

module.exports = get_new_teachers_Routes;
