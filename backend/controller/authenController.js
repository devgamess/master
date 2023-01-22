const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const moment = require("moment");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const sessions = require("express-session");
const secret = process.env.SECRET_KEY;

const userMe = async (req, res) => {
  console.log(sessions.userMe);
  res.json(sessions.userMe);
};
const editUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await db("user")
      .where({
        user_id: id,
      })
      .select(
        "email",
        "firstname",
        "lastname",
        "submit_car",
        "role",
        "agency_id",
        "rank_id"
      );
    return res.json({ status: 200, msg: user[0] });
  } catch (error) {
    console.log(error.message)
    return res.json({ status: 500, msg: error });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  try {
    const query = await db("user")
      .where({
        user_id: id,
      })
      .update({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        submit_car: data.submit_car ? "1" : "0",
        role: data.role,
        agency_id: data.agency_id,
        rank_id: data.rank_id,
      });
    return res.json({ status: 200, msg: query });
  } catch (error) {
    return res.json({ status: 500, msg: error.message });
  }
};
const delUser = async (req, res) => {
  const { id } = req.params;
  try {
    let del = await db("user").where("user_id", id).del();
    return res.json({ status: 200, msg: del });
  } catch (error) {
    return res.json({ status: 500, msg: error });
  }
};
const users = async (req, res) => {
  try {
    let user = await db.select("*").from("user");
    return res.json({
      status: 200,
      msg: "success",
      user: user,
    });
  } catch (error) {
    return res.json({
      status: 500,
      msg: error,
    });
  }
};
const login = async (req, res) => {
  let body = req.body;
  try {
    var data = await db
      .select("*")
      .from("user")
      .where({ email: req.body.email })
      .limit(1);
    if (data.length > 0) {
      bcrypt.compare(
        body.password,
        data[0].password,
        async function (err, isLogin) {
          var token = jwt.sign({ email: data[0].email }, secret);
          if (isLogin) {
            sessions.userMe = data[0];
            return res.json({
              status: 200,
              msg: "success",
              user: data[0],
              token: token,
            });
          } else {
            return res.json({ status: 301, msg: "noUser" });
          }
        }
      );
    } else {
      return res.json({ status: 301, msg: "noUser" });
    }
  } catch (error) {
    return res.json({ status: 500, message: error });
  }
};
const changePassword = async (req, res) => {
  const data = req.body;
  try {
    bcrypt.hash(data.newPassword, saltRounds, async function (err, hash) {
      let user = await db('user')
        .where("user_id", data.user_id)
        .update("password", hash);
      return res.json({
        status: 200,
        msg: "success",
        user: user,
      });
    });
  } catch (error) {
    console.log(error.message)
    return res.json({
      status: 500,
      msg: error,
    });
  }
};
const register = async (req, res) => {
  let body = req.body;
  var data = await db.select("*").from("user").where({ email: req.body.email });
  console.log(data);
  if (data.length < 1) {
    bcrypt.hash(body.password, saltRounds, async function (err, hash) {
      try {
        body.password = hash;
        var sql = await db("user").insert([
          {
            email: body.email,
            password: hash,
            firstname: body.firstname,
            lastname: body.lastname,
            submit_car: body.submit_car ? "1" : "0",
            role: body.role,
            agency_id: body.agency_id,
            rank_id: body.rank_id,
          },
        ]);
        return res.json({ status: 200, msg: "success" });
      } catch (error) {
        return res.json({ status: 500, msg: error });
      }
    });
  } else {
    return res.json({ status: 200, msg: "hasData" });
  }
};
const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  var token = jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ status: 200, msg: "You have been Logged Out", token });
    } else {
      res.send({ msg: "Error" });
    }
  });
};

module.exports = {
  login,
  register,
  users,
  logout,
  delUser,
  editUser,
  userMe,
  updateUser,
  changePassword
};
