import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});
//collection
export default mongoose.model("messagecontents", whatsappSchema);
