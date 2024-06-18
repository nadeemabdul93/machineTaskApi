import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  status: { type: String, enum: ["completed", "active"], default: "active" },
},
  { timestamps: true });
taskSchema.set("toJSON", { virtuals: true });
const taskSchemaModel = mongoose.model("task", taskSchema);

export default taskSchemaModel;
