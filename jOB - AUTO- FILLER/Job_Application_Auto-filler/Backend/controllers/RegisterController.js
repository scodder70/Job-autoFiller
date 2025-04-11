import Register from "../model/RegisterModel.js";
import { catchAsyncErr } from "../middleware/catchasyncErr.js";
import { ErrorHandler } from "../middleware/err.js";

export const register = catchAsyncErr(async (req, res, next) => {
  const {
    FullName,
    email,
    phone,
    github,
    linkedin,
    domainSpecialization,
    skills,
    experience,
  } = req.body;

  try {
    let user = await Register.findOne({ email });

    if (user) {
      // If user exists, update the data
      user.FullName = FullName;
      user.phone = phone;
      user.github = github;
      user.linkedin = linkedin;
      user.domainSpecialization = domainSpecialization;
      user.skills = skills;
      user.experience = experience;
      await user.save();
      
      res.status(200).json({
        success: true,
        message: "User data updated successfully",
        user,
      });
    } else {
      // If user does not exist, create a new one
      user = await Register.create({
        FullName,
        email,
        phone,
        github,
        linkedin,
        domainSpecialization,
        skills,
        experience,
      });

      res.status(201).json({
        success: true,
        message: "User successfully registered",
        user,
      });
    }
  } catch (error) {
    console.error("Error while saving/updating user profile:", error);
    return next(new ErrorHandler("Error saving/updating user profile", 500));
  }
});

export const getRegister = catchAsyncErr(async (req, res, next) => {
  const register = await Register.findOne().sort({ createdAt: -1 }).limit(1); // Fetch the latest document

  if (!register) {
    return next(new ErrorHandler("No user found", 404));
  }

  res.status(200).json({
    success: true,
    register,
  });
});
