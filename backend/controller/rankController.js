const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const moment = require("moment");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const AddRank = async (req, res) => {
  try {
    await db("rank").insert({ rank_name: req.body.rank_name });
    return res.json({ status: 200, msg: "success" });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const GetRank = async (req, res) => {
  try {
    let data = await db("rank").select("*");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const FindOneRank = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("rank").select("*").where({ rank_id: id }).first();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const DelRank = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("rank").where({ rank_id: id }).del()
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const UpdateRank = async (req, res) => {
  try {
    let data = await db("rank")
      .update({ rank_name: req.body.rank_name })
      .where({ rank_id: req.body.rank_id });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};

module.exports = { AddRank, GetRank, FindOneRank, UpdateRank, DelRank };
