const express = require("express");
const { request, response } = require("express");
const db = require("../models");
const City = db.City;
const District = db.District;
const Breed = db.Breed;
const Species = db.Species;
const Gender = db.Gender;

const router = express.Router();

router.get("/cities", (request, response) => {
    City.findAll().then((result) => response.json(result));
});

router.get("/districts", (request, response) => {
    District.findAll().then((result) => response.json(result));
});

router.get("/breeds", (request, response) => {
    Breed.findAll().then((result) => response.json(result));
});

router.get("/species", (request, response) => {
    Species.findAll().then((result) => response.json(result));
});

router.get("/genders", (request, response) => {
    Gender.findAll().then((result) => response.json(result));
})

module.exports = router;