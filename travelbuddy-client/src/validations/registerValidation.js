import * as yup from "yup";

const regFormValidationSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^(9|7|2)\d{7}$/,
      "Invalid Omani phone number (should be 8 digits without +968)"
    ),
  pwd: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cnfPwd: yup
    .string()
    .oneOf([yup.ref('pwd'), null], 'Passwords must match')
    .required("Confirm password is required"),
});

export default regFormValidationSchema;

