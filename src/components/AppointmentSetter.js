import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNotification } from "@/zustand/notification";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { appointmentSchema } from "@/validations/appointment";
import "react-multi-date-picker/styles/layouts/mobile.css";


const AppointmentSetter = () => {
  const { addNotification } = useNotification();
  const [rerender, setRerender] = useState(false);

  const defaultValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    date: "",
  };

  //

  const {
    data: closedWeekDays,
    error: closedWeekDaysError,
    isLoading: closedWeekDaysLoading,
    refetch: refetchClosedWeekDays,
  } = useQuery({
    queryKey: ["closedWeekDays"],
    queryFn: async () => {
      const response = await axios.get(`/api/closedWeekDays`);
      return response.data?.data?.map((str) => parseFloat(str));
    },
  });

  //

  //

  const {
    data: closedDates,
    error: closedDatesError,
    isLoading: closedDatesLoading,
    refetch: refetchClosedDates,
  } = useQuery({
    queryKey: ["closedDates"],
    queryFn: async () => {
      const response = await axios.get(`/api/closedDates`);
      return response.data?.data?.map((str) => parseFloat(str));
    },
  });

  //

  // ↓↓ Read Waiting Time ↓↓

  const {
    data: waitingTime,
    error: waitingTimeError,
    isLoading: waitingTimeLoading,
  } = useQuery({
    queryKey: ["waitingTime"],
    queryFn: async () => {
      const response = await axios.get(`/api/waitingTime`);
      return response.data?.data.waitingTime;
    },
  });

  // ↑↑ Read Waiting Time ↑↑

  // ↓↓ Create Appointments ↓↓

  const createAppointment = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/appointment/create", data);
    },
    onSuccess: () => {
      reset(defaultValues);
      setRerender((prev) => !prev);
      addNotification({
        type: "success",
        message: "وقت مشاوره با موفقیت ایجاد شد",
      });

      setCurrentPage(1);
    },
    onError: (error) => {
      if (error.response.data.code == 1) {
        addNotification({
          type: "error",
          message:
            "زمان انتخابی توسط مراجعه کننده دیگری انتخاب شده است. لطفا زمان دیگری را انتخاب کنید.",
        });
      } else if (error.response.data.code == 2) {
        addNotification({
          type: "error",
          message:
            "زمان انتخابی خارج از زمان کاری مطب است. لطفاً زمان دیگری را انتخاب کنید.",
        });
      } else {
        addNotification({
          type: "error",
          message: "خطایی رخ داد. دوباره تلاش کنید",
        });
      }
    },
  });

  // ↑↑ Create Appointments ↑↑

  const roundToNearest20Minutes = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / waitingTime) * waitingTime;
    date.setMinutes(roundedMinutes);
    return date;
  };

  const [selectedDate, setSelectedDate] = useState(
    roundToNearest20Minutes(new Date()).getTime()
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    createAppointment.mutate(data);
  };

  return (
    <div className="account p-5 w-full rounded-xl">
      <div className="w-full mb-3 text-center text-[20px]">
        <p className="text-[#29D8DB]">درخواست یک ویزیت رایگان</p>
        <div className="bg-[#29D8DB] w-full h-[2px] rounded-[50%] mb-[20px] mt-[10px]"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 w-full max-sm:flex-col">
            <div className="w-full max-sm:flex  max-sm:flex-col">
              <label>نام:</label>
              <input
                className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]  ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                disabled={createAppointment.isLoading}
                type="text"
                {...register("firstName")}
              />
            </div>
            <div className="w-full max-sm:flex max-sm:flex-col">
              <label>نام خانوادگی:</label>
              <input
                className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px] ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                disabled={createAppointment.isLoading}
                type="text"
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col">
              <label>شماره تماس:</label>
              <input
                className={`font-Irancell_Light border-[1px]  focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px] ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
                disabled={createAppointment.isLoading}
                type="tel"
                {...register("mobileNumber")}
              />
            </div>

            <div className="w-full flex flex-col">
              <label>زمان:</label>
              <DatePicker
                className="rmdp-mobile"
                key={rerender}
                editable={false}
                calendar={persian}
                locale={persian_fa}
                disableYearPicker
                // disabled={createAppointment.isLoading}
                hideYear
                minDate={new Date()}
                format="HH:mm - YYYY/MM/DD"
                onOpenPickNewDate={false}
                onChange={(event) => {
                  setValue("date", event.unix);
                  setSelectedDate(event.unix * 1000);
                }}
                plugins={[
                  <TimePicker
                    hideSeconds
                    position="bottom"
                    sStep={60}
                    mStep={waitingTime}
                    hStep={1}
                  />,
                ]}
                value={selectedDate}
                mapDays={({ date }) => {
                  let isWeekend = closedWeekDays?.length
                    ? closedWeekDays?.includes(date.weekDay.index)
                    : [5, 6]?.includes(date.weekDay.index);

                  const formatDate = (timestamp) => {
                    return new Date(timestamp * 1000).toLocaleDateString(
                      "fa-IR-u-nu-latn"
                    );
                  };

                  if (
                    closedDates?.some(
                      (i) => formatDate(i) === formatDate(date?.unix)
                    )
                  )
                    return {
                      disabled: true,
                      style: { color: "#ccc" },
                      onClick: () => {
                        addNotification({
                          type: "info",
                          message:
                            "با عرض پوزش کلینیک در این روز تعطیل می‌باشد.",
                        });
                      },
                    };
                  if (isWeekend)
                    return {
                      disabled: true,
                      style: { color: "#ccc" },
                      onClick: () => {
                        addNotification({
                          type: "info",
                          message:
                            "با عرض پوزش، کلینیک در روزهای پایانی هفته تعطیل می‌باشد.",
                        });
                      },
                    };
                }}
                render={
                  <input
                    {...register("date")}
                    className={`font-Irancell_Light focus:outline-[#29D8DB] cursor-pointer ${
                      !watch("date") ? "text-white" : "text-gray-900"
                    } border-[1px]  rounded-lg w-full h-[40px] pr-[10px] ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-red-500 font-Irancell_Light text-[12px]">
            {errors.firstName && <span>{errors.firstName.message}</span>}
            {errors.lastName && <span>{errors.lastName.message}</span>}
            {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div>
            {createAppointment.isLoading ? (
              "..."
            ) : (
              <div>
                <button
                  type="submit"
                  className="bg-[#29D8DB] w-full h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
                >
                  {createAppointment.isLoading ? "..." : "ثبت درخواست ویزیت"}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentSetter;
