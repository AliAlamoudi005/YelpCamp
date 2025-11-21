const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router
  .route("/")
  //get route for campgrounds
  .get(catchAsync(campgrounds.index))
  //post router for campgrounds
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  //get route for id
  .get(catchAsync(campgrounds.showCampground))
  //put route for id
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  //delete route for id
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
