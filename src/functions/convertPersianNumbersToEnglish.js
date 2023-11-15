export const convertPersianNumbersToEnglish = (number) => {
     return number?.replace(/[۰-۹]/g, function (n) {
       var persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
       return persian.indexOf(n);
     });
   };
   