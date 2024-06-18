import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  status: { type: Number, enum: [1, 0], default: 1 },//1-active,0-inactive
 
},
  { timestamps: true });
taskSchema.set("toJSON", { virtuals: true });
const taskSchemaModel = mongoose.model("task", taskSchema);

export default taskSchemaModel;
