import * as yup from "yup";

// Luhn algorithm (checks card number)
function isValidCardNumber(value = "") {
  const digits = value.replace(/\s+/g, "");
  if (!/^\d+$/.test(digits)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Expiry validation: MM/YY and not expired
function isValidExpiry(value = "") {
  const v = value.trim();
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)) return false;

  const [mmStr, yyStr] = v.split("/");
  const mm = parseInt(mmStr, 10);
  const yy = parseInt(yyStr, 10);

  // Convert YY to 20YY (good for student projects)
  const fullYear = 2000 + yy;

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentYear = now.getFullYear();

  // card valid through the end of expiry month
  if (fullYear < currentYear) return false;
  if (fullYear === currentYear && mm < currentMonth) return false;

  return true;
}

const paymentValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name on card is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must contain letters only"),

  number: yup
    .string()
    .required("Card number is required")
    .transform((val) => (val ? val.replace(/\s+/g, "") : val)) // remove spaces
    .matches(/^\d+$/, "Card number must contain digits only")
    .min(13, "Card number is too short")
    .max(19, "Card number is too long")
    .test("luhn", "Card number is not valid", (val) => isValidCardNumber(val || "")),

  exp: yup
    .string()
    .required("Expire date is required")
    .test("exp-format", "Expire date must be MM/YY", (val) =>
      /^(0[1-9]|1[0-2])\/\d{2}$/.test((val || "").trim())
    )
    .test("exp-not-expired", "Card is expired", (val) => isValidExpiry(val || "")),

  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export default paymentValidationSchema;
