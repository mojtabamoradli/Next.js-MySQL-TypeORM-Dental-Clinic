export const convertEnglishNumbersToPersian = (number) => {
     const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
     return String(number).replace(/[0-9]/g, (n) => persianNumbers[n]);
   };
   