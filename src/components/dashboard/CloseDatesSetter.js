import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNotification } from "@/zustand/notification";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CloseDatesSetter = ({ data, loading, error, refetch }) => {
  const { addNotification } = useNotification();

  const [closedDate, setClosedDate] = useState(data);

  const updateClosedDates = useMutation({
    mutationFn: () => {
      return axios.patch(`/api/closedDates/update`, {
        closedDates: closedDate,
      });
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "روزهای تعطیل ویرایش شد",
      });
      refetch();
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  useEffect(() => {
    setClosedDate(data);
  }, [data]);


  const remove = (date) => {
     setClosedDate(closedDate.filter((i) => i != date))
  }



  return (
    <div>
      <p>تاریخ‌ های تعطیلی کلینیک</p>

      <div className="flex">
        <p>روز تعطیل جدید</p>
        <DatePicker
          className="rmdp-mobile"
          value={closedDate && closedDate[-1]}
          onChange={(event) =>
            setClosedDate([...new Set([...closedDate, event.unix])])
          }
          calendar={persian}
          locale={persian_fa}
          placeholder=""
        />
      </div>

      <div>
        {data?.map((date, index) => (
          <div key={index} className="flex gap-1">
               <span className={`${!closedDate?.includes(date) ? "text-red-500" : "text-gray-900"}`}>{new Date(date * 1000).toLocaleDateString("fa-IR-u-nu-latn")}</span>
            <span className="text-red-500" onClick={() => remove(date)}>حذف</span>
          </div>
        ))}
      </div>

      <button onClick={() => updateClosedDates.mutate()}>ویرایش</button>

    </div>
  );
};

export default CloseDatesSetter;
