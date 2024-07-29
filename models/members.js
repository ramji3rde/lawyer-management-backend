const mongoose = require("mongoose")
const Schema = mongoose.Schema
const SchemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}

const members = new Schema({
    name: { type: String },
    userName: { type: String, unique: true },
    emailAddress: { type: String },
    password: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
}, SchemaOptions)


module.exports = mongoose.model("members", members)