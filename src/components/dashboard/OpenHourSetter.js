import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNotification } from "@/zustand/notification";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";

const OpenHourSetter = () => {
  const { addNotification } = useNotification();

  const daysOfWeekInPersian = {
    Saturday: "شنبه",
    Sunday: "یکشنبه",
    Monday: "دوشنبه",
    Tuesday: "سه‌شنبه",
    Wednesday: "چهارشنبه",
    // Thursday: "پنج‌شنبه",
    // Friday: "جمعه",
  };

  const defaultValues = [
    {
      id: 1,
      dayOfWeek: "Saturday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 2,
      dayOfWeek: "Sunday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 3,
      dayOfWeek: "Monday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 4,
      dayOfWeek: "Tuesday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 5,
      dayOfWeek: "Wednesday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 6,
      dayOfWeek: "Thursday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
    {
      id: 7,
      dayOfWeek: "Friday",
      startAM: 0,
      endAM: 0,
      startPM: 0,
      endPM: 0,
    },
  ];

  const timeLabels = ["startAM", "endAM", "startPM", "endPM"];

  const [openHours, setOpenHours] = useState(defaultValues);

  const { data, error, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["openHours"],
    queryFn: async () => {
      const response = await axios.get(`/api/openHours`);
      return response.data.data;
    },
  });

  const updateOpenHours = useMutation({
    mutationFn: () => {
      return axios.patch("/api/openHours/update", { openHours });
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "ساعت کاری با موفقیت ویرایش شد",
      });
    },
    onError: () => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenHours(data);
    }
  }, [isSuccess]);

  const handleDateChange = (value, index, label) => {
    const updatedOpenHours = [...openHours];
    updatedOpenHours[index] = {
      ...updatedOpenHours[index],
      [label]: value ? value.unix : 0,
    };
    setOpenHours(updatedOpenHours);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    updateOpenHours.mutate(openHours);
  };

  return data ? (
    <div>
      <form onSubmit={onSubmit}>
        <p>ساعت کاری مطب</p>

        {Object.keys(daysOfWeekInPersian).map((day, index) => (
          <div key={day} className="flex gap-2">
            <p>{daysOfWeekInPersian[day]}</p>
            {timeLabels.map((label, i) => (
              <div key={label} className="flex flex-col">
                <p>
                  {i == 0
                    ? "شروع صبح"
                    : i == 1
                    ? "پایان صبح"
                    : i == 2
                    ? "شروع بعدازظهر"
                    : i == 3 && "پایان بعدازظهر"}
                </p>
                <div className="flex">
                  <DatePicker
                    disableDayPicker
                    format="HH:mm"
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(value) => handleDateChange(value, index, label)}
                    plugins={[<TimePicker hideSeconds />]}
                    render={
                      <input
                        placeholder={
                          openHours[index][label] != 0 &&
                          convertEnglishNumbersToPersian(
                            new Date(
                              openHours[index][label] * 1000
                            ).toLocaleTimeString("fa-IR-u-nu-latn", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          )
                        }
                        className={`border-[1px] border-solid border-gray-900 w-[50px] cursor-pointer placeholder:text-gray-900 `}
                      />
                    }
                  />
                  {openHours[index][label] != 0 && (
                    <button
                      type="button"
                      onClick={() => handleDateChange(null, index, label)}
                    >
                      پاک‌کردن
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        <button type="submit">
          {updateOpenHours.isLoading ? "..." : "ویرایش"}
        </button>
      </form>
    </div>
  ) : isLoading ? (
    "..."
  ) : (
    error && "خطا در دریافت ساعت کاری مطب"
  );
};

export default OpenHourSetter;
