import User from "../models/userModels.js";
import apiResponse from "../utils/apiResponse.js";

const authControllers = {
  register: async (req, res) => {
    try {
        const { name, email, password, zipCode, phone, mobile } = req.body;
        const user = await User({ name, email, password, zipCode, phone, mobile });
        return apiResponse.success(res, user);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authControllers;
