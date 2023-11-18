import * as yup from "yup";
import { convertPersianNumbersToEnglish } from "@/functions/convertPersianNumbersToEnglish";

export const loginSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .min(11, "شماره‌ی تماس باید ۱۱ رقمی باشد.")
    .max(11, "شماره‌ی تماس باید ۱۱ رقمی باشد.")
    .transform((value) => convertPersianNumbersToEnglish(value))
    .matches(/09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/)
    .required("لطفاً شماره‌ی تماس را وارد کنید."),
  password: yup.string().required("لطفاً رمز عبور را وارد کنید."),
});
