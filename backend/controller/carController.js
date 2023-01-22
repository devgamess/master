const db = require("../config/db");
const moment = require("moment");
require("dotenv").config();
const fs = require("fs");

const AddCar = async (req, res) => {
  const data = JSON.parse(req.body.data);
  if (!req.file) {
    return res.send({
      status: 401,
      message: "NO_OK",
    });
  } else {
    try {
      let query = await db("car").insert({
        car_image: `images/${req.file.filename}`,
        car_brand: data.car_brand,
        car_model: data.car_model,
        car_license: data.car_license,
        car_max_peple: data.car_max_peple,
        car_detail: data.car_detail,
        car_color_badge: data.car_color_badge,
      });
      return res.json({
        status: 200,
        message: "OK",
        results: query,
      });
    } catch (error) {
      return res.json({
        status: 500,
        message: "NO_OK",
      });
    }
  }
};
const GetCar = async (req, res) => {
  try {
    let data = await db("car").select("*").where("isActive", "1");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const FindOneCar = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("car").select("*").where({ car_id: id }).first();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const UpdateCarData = async (req, res) => {
  try {
    let data = await db("car")
      .update({
        car_brand: req.body.car_brand,
        car_model: req.body.car_model,
        car_license: req.body.car_license,
        car_max_peple: req.body.car_max_peple,
        car_detail: req.body.car_detail,
      })
      .where({ car_id: req.body.car_id });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const UpdateCarImage = async (req, res) => {
  let data = JSON.parse(req.body.data);
  let resultHandler = async function (err) {
    if (err) {
      return res.json({
        status: 500,
        result: err,
        msg: "delete file not working",
      });
    } else {
      try {
        let query = await db("car")
          .update({
            car_image: `images/${req.file.filename}`,
          })
          .where({ car_id: data.car_id });
        return res.json({ status: 200, msg: "success", result: query });
      } catch (error) {
        return res.json({ status: 401, msg: error });
      }
    }
  };
  fs.unlink(`public/${data.car_image}`, resultHandler);
};
const DelCar = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await db("car").where({ car_id: id }).update({ isActive: "0" });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const NotInCar = async (req, res) => {
  console.log(req.body.car_ids);
  try {
    let data = await db("car")
      .whereNotIn("car_id", req.body.car_ids)
      .select("*");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};

module.exports = {
  AddCar,
  GetCar,
  FindOneCar,
  UpdateCarData,
  UpdateCarImage,
  DelCar,
  NotInCar,
};
