const db = require("../config/db");
const moment = require("moment");
require("dotenv").config();
const fs = require("fs");

const AddChauffeur = async (req, res) => {
  const data = JSON.parse(req.body.data);
  if (!req.file) {
    return res.send({
      status: 401,
      message: "NO_OK",
    });
  } else {
    try {
      let query = await db("chauffeur").insert({
        chauffeur_image: `images/${req.file.filename}`,
        chauffeur_fname: data.chauffeur_fname,
        chauffeur_lname: data.chauffeur_lname,
        chauffeur_phone: data.chauffeur_phone,
        agency_id: data.agency_id,            
      });
      return res.json({
        status: 200,
        message: "OK",
        results: query,
      });
    } catch (error) {
      return res.json({
        status: 500,
        message: error.message,
      });
    }
  }
};

const GetChauffeur = async (req, res) => {
  try {
    let data = await db("chauffeur as cf")
      .leftJoin("agency as a", "cf.agency_id", "a.agency_id")      
      .select("*")
      .where({ isActive: 1 });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const FindOneChauffeur = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db("chauffeur")
      .select("*")
      .where({ chauffeur_id: id })
      .first();
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const UpdateChauffeurData = async (req, res) => {
  const body = req.body;
  try {
    let data = await db("chauffeur")
      .update({
        chauffeur_fname: body.chauffeur_fname,
        chauffeur_lname: body.chauffeur_lname,
        chauffeur_phone: body.chauffeur_phone,
        agency_id: body.agency_id,        
      })
      .where({ chauffeur_id: req.body.chauffeur_id });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const UpdateChauffeurImage = async (req, res) => {
  let data = JSON.parse(req.body.data);
  // return res.json({ status: 200, msg: "success", result: req.file })
  let resultHandler = async function (err) {
    if (err) {
      return res.json({
        status: 500,
        result: err,
        msg: "delete file not working",
      });
    } else {
      try {
        let query = await db("chauffeur")
          .update({
            chauffeur_image: `images/${req.file.filename}`,
          })
          .where({ chauffeur_id: data.chauffeur_id });
        return res.json({ status: 200, msg: "success", result: query });
      } catch (error) {
        return res.json({ status: 401, msg: error.message });
      }
    }
  };
  fs.unlink(`public/${data.chauffeur_image}`, resultHandler);
};
const DelChauffeur = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await db("chauffeur")
      .update({ isActive: 0 })
      .where({ chauffeur_id: id });
    return res.json({ status: 200, msg: "success", result: data });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};

module.exports = {
  AddChauffeur,
  GetChauffeur,
  FindOneChauffeur,
  UpdateChauffeurData,
  UpdateChauffeurImage,
  DelChauffeur,
};
