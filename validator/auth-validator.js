const { z } = require("zod");

//object schema for login
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters." })
    .max(255, { message: "Name must be less than 255 characters." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be atleast of 6 characters." })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

////object schema for signup

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters." })
    .max(255, { message: "Name must be less than 255 characters." }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be of 10 characters" })
    .max(20, { message: "Phone number must be of 20 characters" }),
});

module.exports = { signupSchema, loginSchema };
