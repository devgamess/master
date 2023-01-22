const db = require("../config/db");
const moment = require("moment");
require("dotenv").config();
const fs = require("fs");

const GetCare = async (req, res) => {
  const { carId } = req.params;
  try {
    let data = await db("chauffeur_care_car as cc")
      .leftJoin("chauffeur as c", "c.chauffeur_id", "cc.chauffeur_id")
      .where("cc.car_id", carId)
      .select("*");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const AddCare = async (req, res) => {
  const data = req.body;
  try {
    let query = await db("chauffeur_care_car").insert({
      chauffeur_id: data.chauffeur_id,
      car_id: data.car_id,
    });
    return res.json({ status: 200, msg: "success", result: query });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const DelCare = async (req, res) => {
  const { id } = req.params;
  try {
    let query = await db("chauffeur_care_car").where("id", id).delete()
    return res.json({ status: 200, msg: "success", result: query });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};

module.exports = {
  GetCare,
  AddCare,
  DelCare
};
