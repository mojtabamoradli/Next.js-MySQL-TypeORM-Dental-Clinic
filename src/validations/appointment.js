import * as yup from "yup";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";

export const appointmentSchema = yup
  .object({
    firstName: yup
      .string()
      .required("لطفاً نام را وارد کنید.")
      .matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, {
        message: "نام را به فارسی وارد کنید.",
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .required("لطفاً نام خانوادگی را وارد کنید")
      .matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, {
        message: "نام خانوادگی را به فارسی وارد کنید.",
        excludeEmptyString: true,
      }),
    mobileNumber: yup
      .string()
      .min(11, "شماره‌ی تماس باید ۱۱ رقمی باشد.")
      .max(11, "شماره‌ی تماس باید ۱۱ رقمی باشد.")
      .transform((value) => convertEnglishNumbersToPersian(value))
      .matches(/09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/)
      .required("لطفاً شماره‌ی تماس را وارد کنید."),
    date: yup
      .string()
      .required("زمانی برای ویزیت انتخاب کنید.")
      .test("is-number", "زمانی برای ویزیت انتخاب کنید.", function (value) {
        return !value || !isNaN(Number(value));
      }),
  })
  .required();
