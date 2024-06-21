import pkg from "moment-timezone";
const now  =pkg;;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, lowercase: true, default: null ,unique: true},
  password: { type: String, default: null },
  userType: { type: String, enum: ["admin", "user"], default: null},
  status: { type: Number, enum: [1, 2, 3], default: 1 },//1-active,2-suspended,3-deleted

  
},
  { timestamps: true });
userSchema.index({ location: "2dsphere" });
userSchema.set("toJSON", { virtuals: true });
const userSchemaModel = mongoose.model("user", userSchema);

export default userSchemaModel;
