const db = require("../config/db");
require("dotenv").config();

const GetChw = async (req, res) => {
  try {
    let data = await db("c_province").select("*").orderBy("changwatname");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const GetAmp = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("c_district")
      .select("*")
      .where("changwatcode", id)
      .orderBy("ampurname");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const GetTmb = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("c_subdistrict")
      .select("*")
      .where("ampurcode", id)
      .orderBy("tambonname");
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const GetFullName = async (req, res) => {
  const { id } = req.params;
  try {
    let find = await db("c_subdistrict as cs")
      .where("cs.tamboncodefull", id)
      .first();    
    let data = await db("c_province as cp")
      .leftJoin("c_district as cd", "cd.changwatcode", "cp.changwatcode")
      .leftJoin("c_subdistrict as cs", "cs.ampurcode", "cd.ampurcodefull")
      .where("cp.changwatcode", find.changwatcode)
      .where("cd.ampurcodefull", find.ampurcode)
      .where("cs.tamboncodefull", find.tamboncodefull)
      .select("*")
    
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};

module.exports = {
  GetChw,
  GetAmp,
  GetTmb,
  GetFullName,
};
