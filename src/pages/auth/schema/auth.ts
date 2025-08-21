import * as yup from "yup";

export const authSchema = yup.object({
  username: yup.string().required("Please enter your name"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});
