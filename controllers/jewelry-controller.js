const { Jewelry } = require("../models");

const jewelryController = {
  // get all jewelry
  getAllJewelry(req, res) {
    Jewelry.find({})
      .then((dbJewelryData) => res.json(dbJewelryData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one jewelry by id
  getJewelryById({ params }, res) {
    Jewelry.findOne({ _id: params.id })
      .then((dbJewelryData) => res.json(dbJewelryData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create Jewelry log
  createJewelryLog({ body }, res) {
    Jewelry.create(body)
      .then((dbJewelryData) => res.json(dbJewelryData))
      .catch((err) => res.json(err));
  },

  //Update Jewelry Log
  updateJewelry({ params, body }, res) {
    Jewelry.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbJewelryData) => {
        if (!dbJewelryData) {
          res.status(404).json({ message: "No jewlery log with this id." });
          return;
        }
        res.json(dbJewelryData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete Jewelry Log
  deleteJewelry({ params }, res) {
    Jewelry.findOneAndDelete({ _id: params.id })
      .then((dbJewelryData) => {
        if (!dbJewelryData) {
          res
            .status(404)
            .json({ message: "No jewelry log found with this id" });
          return;
        }
        res.json(dbJewelryData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = jewelryController;
