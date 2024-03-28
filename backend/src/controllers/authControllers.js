import User from "../models/userModels.js";
import apiResponse from "../utils/apiResponse.js";
import cloudinaryFileUpload from "../utils/coudinary.js";
import { comparePassword, hashPassword } from "../utils/encrypt.js";
import { deleteFile } from "../utils/multer.js";
import { generateToken } from "./../middlewares/authMiddleware.js";

const authControllers = {
  register: async (req, res) => {
    try {
      const userIsAleadyRegistered = await User.findOne({
        email: req.body.email,
      });

      if (userIsAleadyRegistered) {
        if (req?.file) deleteFile(req?.file?.path);
        return apiResponse.error(res, "User is already registered");
      }

      let fileUrl = "";
      if (req?.file) {
        fileUrl = await cloudinaryFileUpload(req?.file?.path);
      }
      const reqBody = {
        ...req.body,
        password: await hashPassword(req.body?.password),
        profilePic: fileUrl,
      };
      const newUser = new User(reqBody);
      await newUser.save();
      return apiResponse.success(res, {
        successMessage: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      return apiResponse.validationErrors(res, error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await comparePassword(password, user.password))) {
        return apiResponse.error(res, "Invalid email or password");
      }
      const token = await generateToken(user?.email);
      return apiResponse.success(res, {
        successMessage: "Logged in successfully",
        token,
      });
    } catch (error) {
      return apiResponse.validationErrors(res, error);
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const userEmailId = req?.userInfo?.userEmail;
      const user = await User.findOne({ email: userEmailId }).select(
        "-password -_id"
      );
      if (!user) return apiResponse.error(res, "User not found");

      return apiResponse.success(res, user);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
        const userEmailId = req.userInfo.userEmail;
        const user = await User.findOne({ email: userEmailId });

        if (!user) {
            return apiResponse.error(res, "User not found");
        }

        const updatedFields = { ...req.body };
        const newPassword = req.body.password ? await hashPassword(req.body.password) : undefined;

        if (req?.file && req?.file?.path) {
          const fileUrl = await cloudinaryFileUpload(req.file.path);
          updatedFields.profilePic = fileUrl;
        }

        if (newPassword) {
          updatedFields.password = newPassword;
        }

        const updatedUser = await User.findOneAndUpdate(
          { email: userEmailId },
          { $set: updatedFields },
          { new: true }
        ).select("-password -_id");

        return apiResponse.success(res, {
          successMessage: "User profile updated successfully",
          user: updatedUser,
        });
    } catch (error) {
        return apiResponse.validationErrors(res, error);
    }
},

};

export default authControllers;
