import * as yup from "yup";
import { convertPersianNumbersToEnglish } from "@/functions/convertPersianNumbersToEnglish";

export const appointmentSchema = yup
  .object({
    firstName: yup
      .string()
      .required("اجباری")
      .matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, {
        message: "فقط فارسی",
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .required("اجباری")
      .matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, {
        message: "فقط فارسی",
        excludeEmptyString: true,
      }),
    mobileNumber: yup
      .string()
      .min(11, "شماره باید ۱۱ رقم باشه")
      .max(11, "شماره باید ۱۱ رقم باشه")
      .transform((value) => convertPersianNumbersToEnglish(value))
      .matches(/09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/)
      .required("اجباری"),
      date: yup
      .string()
      .required("اجباری")
      .test("is-number", "اجباری", function (value) {
        return !value || !isNaN(Number(value));
      }),
  })
  .required();
