const db = require("../config/db");;
require("dotenv").config();

const AddAgency = async (req, res) => {
  try {
    await db("agency").insert({ agency_name: req.body.agency_name });
    return res.json({ status: 200, msg: "success" });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const GetAgency = async (req, res) => {
  try {
    let data = await db("agency").select("*");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const FindOneAgency = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("agency").select("*").where({ agency_id: id }).first();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const UpdateAgency = async (req, res) => {
  try {
    let data = await db("agency")
      .update({ agency_name: req.body.agency_name })
      .where({ agency_id: req.body.agency_id });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const DeleteAgency = async (req, res) => {
  let {id} = req.params
  try {
    let data = await db("agency")
      .where({ agency_id: id })
      .del();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};

module.exports = {
  AddAgency,
  GetAgency,
  FindOneAgency,
  UpdateAgency,
  DeleteAgency,
};
