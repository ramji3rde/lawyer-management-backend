const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Communication = new Schema({
  logType: { type: String },
  date: { type: Date, default: Date.now },
  time: { type: String },
  // from: { type: Schema.Types.ObjectId, ref: "Contacts" },
  from: { type: String },
  subject: String,
  body: String,
  to: { type: Schema.Types.ObjectId, ref: "Contacts" },
  matter: { type: Schema.Types.ObjectId, ref: "Matters" },
  contact: { type: Schema.Types.ObjectId, ref: "Contacts" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  addTime: { type: String },
  userName: { type: String }
});

module.exports = mongoose.model("Communication", Communication);
