import * as yup from "yup";
import { convertPersianNumbersToEnglish } from "@/functions/convertPersianNumbersToEnglish";

export const registerSchema = yup.object().shape({
  fullName: yup.string().required("لطفاً نام را وارد کنید."),
  mobileNumber: yup
    .string()
    .min(11, "شماره‌ی تماس می‌بایست ۱۱ رقم باشد")
    .max(11, "شماره‌ی تماس می‌بایست ۱۱ رقم باشد")
    .transform((value) => convertPersianNumbersToEnglish(value))
    .matches(/09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/)
    .required("لطفاً شماره تماس را وارد کنید."),
  password: yup
    .string()
    .required("لطفاً پسورد را وارد کنید.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
      "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters (#$@!%&*?)"
    ),
});
