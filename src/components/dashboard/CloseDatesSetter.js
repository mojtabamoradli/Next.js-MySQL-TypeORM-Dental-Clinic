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
    setClosedDate(closedDate.filter((i) => i != date));
  };

  return (
    <div className="flex flex-col justify-center items-center text-center  ">
      <p className="flex text-center justify-center bg-[#29D8DB] text-white h-[45px] rounded-t-lg items-center w-[300px]">
        تاریخ‌ های تعطیلی کلینیک
      </p>

      <div className="bg-gray-50 w-[300px] py-4">
        <DatePicker
          className="rmdp-mobile"
          value={closedDate && closedDate[-1]}
          onChange={(event) =>
            setClosedDate([...new Set([...closedDate, event.unix])])
          }
          calendar={persian}
          locale={persian_fa}
          placeholder=""
          disableDayPicker={loading}
          render={
            <input
              className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg max-md:w-full w-[280px] h-[40px]  text-center`}
            />
          }
        />
      </div>

      <button
        className="bg-[#29D8DB] w-[300px] h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-b-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
        onClick={() => updateClosedDates.mutate()}
        >
        ویرایش
      </button>
        <div className="mt-[30px]">

          {data?.map((date, index) => (
            <div key={index} className="flex gap-1">
              <span
                className={`${
                  !closedDate?.includes(date) ? "text-red-500" : "text-gray-900"
                }`}
              >
                {new Date(date * 1000).toLocaleDateString("fa-IR-u-nu-latn")}
              </span>
              <span className="text-red-500" onClick={() => remove(date)}>
              <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 6.72998C20.98 6.72998 20.95 6.72998 20.92 6.72998C15.63 6.19998 10.35 5.99998 5.12 6.52998L3.08 6.72998C2.66 6.76998 2.29 6.46998 2.25 6.04998C2.21 5.62998 2.51 5.26998 2.92 5.22998L4.96 5.02998C10.28 4.48998 15.67 4.69998 21.07 5.22998C21.48 5.26998 21.78 5.63998 21.74 6.04998C21.71 6.43998 21.38 6.72998 21 6.72998Z"
                          fill="#ef4444"
                        />
                        <path
                          d="M8.5 5.72C8.46 5.72 8.42 5.72 8.37 5.71C7.97 5.64 7.69 5.25 7.76 4.85L7.98 3.54C8.14 2.58 8.36 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64 2.76 9.62 2.9 9.47 3.79L9.24 5.09C9.18 5.46 8.86 5.72 8.5 5.72Z"
                          fill="#ef4444"
                        />
                        <path
                          d="M15.21 22.75H8.79C5.3 22.75 5.16 20.82 5.05 19.26L4.4 9.18995C4.37 8.77995 4.69 8.41995 5.1 8.38995C5.52 8.36995 5.87 8.67995 5.9 9.08995L6.55 19.16C6.66 20.68 6.7 21.25 8.79 21.25H15.21C17.31 21.25 17.35 20.68 17.45 19.16L18.1 9.08995C18.13 8.67995 18.49 8.36995 18.9 8.38995C19.31 8.41995 19.63 8.76995 19.6 9.18995L18.95 19.26C18.84 20.82 18.7 22.75 15.21 22.75Z"
                          fill="#ef4444"
                        />
                        <path
                          d="M13.66 17.25H10.33C9.92 17.25 9.58 16.91 9.58 16.5C9.58 16.09 9.92 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z"
                          fill="#ef4444"
                        />
                        <path
                          d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                          fill="#ef4444"
                        />
                      </svg>
              </span>
            </div>
          ))}
        </div>
    </div>
  );
};

export default CloseDatesSetter;
