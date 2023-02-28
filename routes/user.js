const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  email: String,
  password: String,
  role: String,
  userid: String,
  accounts: [
    {
      accountName: String,
      clientName: String,
      manager: String,
      team: String,
    },
  ],
});

const UserModel = mongoose.model("users", userSchema);
module.exports = router;

//Add User
router.post("/adduser", ({ body }, res) => {
  const newUser = new UserModel({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
    userid: body.userid,
    accounts: [
      {
        accountName: body.accounts[0].accountName,
        clientName: body.accounts[0].clientName,
        manager: body.accounts[0].manager,
        team: body.accounts[0].team,
      },
    ],
  });
  newUser.save((err) => {
    if (!err) {
      res.send("User added");
    } else {
      res.send(err);
    }
  });
});

//GetUsers
router.get("/getusers", (req, res) => {
  UserModel.find({}, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

//GetUser Data
router.post("/getuserdata", ({ body }, res) => {
  UserModel.find({ userid: body.userid }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

//Update User
router.post("/updateuser", ({ body }, res) => {
  UserModel.findOneAndUpdate(
    {
      userid: body.userid,
    },
    {
      name: body.name,
      email: body.email,
      password: body.password,
      accounts: [
        {
          accountName: body.accounts[0].accountName,
          clientName: body.accounts[0].clientName,
          manager: body.accounts[0].manager,
          team: body.accounts[0].team,
        },
      ],
    },
    (err) => {
      if (!err) {
        res.send("User has been updated succesfully");
      } else {
        res.send(err);
      }
    }
  );
});
//Delete User
router.post("/deleteuser", ({ body }, res) => {
  UserModel.findOneAndDelete(
    {
      userid: body.userid,
    },
    (err) => {
      if (!err) {
        res.send("User has been deleted");
      } else {
        res.send(err);
      }
    }
  );
});
//Login User
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (check) {
      res.json(check);
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("notexist");
  }
});
