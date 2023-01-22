const db = require("../config/db");
require("dotenv").config();
const moment = require("moment");

const AddReserve = async (req, res) => {
  try {
    await db("reserve").insert({
      car_id: req.body.car_id,
      user_id: req.body.user_id,
      reserve_objective: req.body.reserve_objective,
      reserve_address_code_full: req.body.reserve_address_code_full,
      reserve_length: req.body.reserve_length,
      reserve_budget_type: req.body.reserve_budget_type,
      reserve_personnel_amount: req.body.reserve_personnel_amount,
      reserve_student_amount: req.body.reserve_student_amount,
      reserve_start_date_time: moment(req.body.reserve_start_date_time).format(
        "YYYY-MM-DD h:mm:ss"
      ),
      reserve_end_date_time: moment(req.body.reserve_end_date_time).format(
        "YYYY-MM-DD h:mm:ss"
      ),
    });
    return res.json({ status: 200, msg: "success" });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const SubmitReserve = async (req, res) => {  
  const { reserveId, userId } = req.body;
  try {
    let data = await db("reserve as r")
      .where("r.reserve_service_id", reserveId)
      .update({ reserve_isSubmit: "1", reserve_submit_user_id: userId });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const GetReserveIsSubmit = async (req, res) => {
  try {
    let data = await db("reserve as r")
      .leftJoin("car", "r.car_id", "car.car_id")
      .where("r.reserve_isSubmit", "1")
      .where("r.reserve_isActive", "1")
      .select(
        "r.*",
        "car.car_brand",
        "car.car_model",
        "car.car_license",
        "car.car_color_badge"
      );
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const GetReserveAll = async (req, res) => {
  try {
    let data = await db("reserve as r")
      .leftJoin("user", "r.user_id", "user.user_id")
      .leftJoin("car", "r.car_id", "car.car_id")
      .where("r.reserve_isActive", "1")
      .select(
        "r.*",
        "user.*",
        "car.car_brand",
        "car.car_model",
        "car.car_license",
        "car.car_color_badge"
      );
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const FindOneReserve = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("reserve as r")
      .leftJoin("car", "r.car_id", "car.car_id")
      .leftJoin("user as u", "r.user_id", "u.user_id")
      .leftJoin("user as us", "r.reserve_submit_user_id", "us.user_id")
      .select(
        "r.*",
        "u.firstname",
        "u.lastname",
        "us.firstname as submit_firstname",
        "us.lastname as submit_lastname",
        "car.car_brand",
        "car.car_model",
        "car.car_license"
      )
      .where({ reserve_service_id: id })
      .first();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const DeleteReserve = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("reserve as r")
      .where({ reserve_service_id: id })
      .update({ reserve_isActive: "0" });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
// const UpdateAgency = async (req, res) => {
//   try {
//     let data = await db("agency")
//       .update({ agency_name: req.body.agency_name })
//       .where({ agency_id: req.body.agency_id });
//     return res.json({ status: 200, msg: "success", result: data });
//   } catch (error) {
//     return res.json({ status: 500, msg: error });
//   }
// };
// const DeleteAgency = async (req, res) => {
//   let {id} = req.params
//   try {
//     let data = await db("agency")
//       .where({ agency_id: id })
//       .del();
//     return res.json({ status: 200, msg: "success", result: data });
//   } catch (error) {
//     return res.json({ status: 500, msg: error });
//   }
// };

module.exports = {
  AddReserve,
  GetReserveIsSubmit,
  GetReserveAll,
  FindOneReserve,
  SubmitReserve,
  DeleteReserve,
};
