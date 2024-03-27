import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  lat: Number,
  lang: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
