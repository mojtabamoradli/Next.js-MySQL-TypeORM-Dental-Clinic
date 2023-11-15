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
import OpenHourSetter from "../components/dashboard/OpenHourSetter";
import WaitingTimeSetter from "../components/dashboard/WaitingTimeSetter";
import Appointments from "../components/dashboard/Appointments";
import ClosedWeekDaysSetter from "../components/dashboard/ClosedWeekDaysSetter";
import CloseDatesSetter from "../components/dashboard/CloseDatesSetter";

const dashboard = () => {
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

  // ↓↓ Read Appointments ↓↓

  const [searchedText, setSearchedText] = useState("");
  const [dateRange, setDateRange] = useState();
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    data: appointments,
    error: appointmentsQueryError,
    isLoading: appointmentsQueryLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/appointments?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&searchedText=${searchedText}&from=${
          dateRange?.length ? dateRange[0]?.unix : ""
        }&until=${dateRange?.length > 1 ? dateRange[1]?.unix : ""}`
      );
      return response.data;
    },
  });

  // ↑↑ Read Appointments ↑↑

  // ↓↓ Delete Appointment ↑↑

  const deleteAppointment = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/appointment/delete?id=${id}`);
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "وقت مشاوره حذف شد",
      });
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  const onDeletion = (id) => {
    deleteAppointment.mutate(id);
  };

  // ↑↑  Delete Appointment ↑↑

  // ↓↓ Update Appointment ↑↑

  const [updateMode, setUpdateMode] = useState({
    status: false,
    id: null,
    i: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      date: "",
    },
  });

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

  const setItemToUpdate = async (appointment) => {
    setUpdateMode({
      status: true,
      id: appointment.id,
      i: {
        firstName: appointment.firstName,
        lastName: appointment.lastName,
        mobileNumber: appointment.mobileNumber,
        date: appointment.date,
      },
    });
    setValue("firstName", appointment.firstName);
    setValue("lastName", appointment.lastName);
    setValue("mobileNumber", appointment.mobileNumber);
    setValue("date", appointment.date);
    setSelectedDate(+getValues().date * 1000);
  };

  const updateAppointment = useMutation({
    mutationFn: (data) => {
      return axios.patch(`/api/appointment/update?id=${updateMode.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        date: +data.date ? +data.date : updateMode.i.date,
      });
    },
    onSuccess: () => {
      reset(defaultValues);

      setUpdateMode({
        status: false,
        id: null,
        i: {
          firstName: "",
          lastName: "",
          mobileNumber: "",
          date: "",
        },
      });
      addNotification({
        type: "success",
        message: "وقت مشاوره ویرایش شد",
      });
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

  // ↑↑  Update Appointment ↑↑

  const onSubmit = (data) => {
    updateMode.status
      ? updateAppointment.mutate(data)
      : createAppointment.mutate(data);
  };

  const cancelUpdate = () => {
    reset(defaultValues);
    setRerender((prev) => !prev);
    setUpdateMode({
      status: false,
      id: null,
      i: {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        date: "",
      },
    });
  };
  // ↓ Pagination ↓

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };

  // ↑ Pagination ↑

  useEffect(() => {
    refetch();
  }, [
    itemsPerPage,
    currentPage,
    // isSearching,
    createAppointment.isSuccess,
    deleteAppointment.isSuccess,
    updateAppointment.isSuccess,
  ]);

  const onSearch = () => {
    setIsSearching(true);
    refetch();
  };

  const onClearSearch = () => {
    setIsSearching(false);
    setSearchedText("");
    setDateRange();
  };

  useEffect(() => {
    if (!searchedText && !dateRange?.length) {
      () => onClearSearch();
      refetch();
    }
  }, [searchedText, dateRange?.length, isSearching]);

  const [deleteMode, setDeleteMode] = useState({ status: false, id: null });
  const setItemToDelete = (id) => {
    setDeleteMode({ status: true, id });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>نام:</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <label>نام خانوادگی:</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div>
          <label>شماره تماس:</label>
          <input type="tel" {...register("mobileNumber")} />
          {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
        </div>

        <div>
          <label>زمان:</label>
          <DatePicker
            className="rmdp-mobile"
            key={rerender}
            editable={false}
            calendar={persian}
            locale={persian_fa}
            disableYearPicker
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
            value={updateMode.status ? +getValues().date * 1000 : selectedDate}
            mapDays={({ date }) => {
              let isWeekend = closedWeekDays?.length
                ? closedWeekDays?.includes(date.weekDay.index)
                : [5, 6]?.includes(date.weekDay.index);

                const formatDate = (timestamp) => {
                  return new Date(timestamp * 1000).toLocaleDateString("fa-IR-u-nu-latn");
                };

              if (
                closedDates?.some((i) => formatDate(i) === formatDate(date?.unix))
              )
                return {
                  disabled: true,
                  style: { color: "#ccc" },
                  onClick: () => {
                    addNotification({
                      type: "info",
                      message: "با عرض پوزش کلینیک در این روز تعطیل می‌باشد.",
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
                className={` focus:outline-none cursor-pointer ${
                  !watch("date") ? "text-white" : "text-gray-900"
                }`}
              />
            }
          />
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        {createAppointment.isLoading ? (
          "..."
        ) : (
          <div>
            <button type="submit">
              {updateMode.status
                ? updateAppointment.isLoading
                  ? "..."
                  : "ویرایش"
                : createAppointment.isLoading
                ? "..."
                : "ثبت"}
            </button>
            {updateMode.status && !updateAppointment.isLoading && (
              <button className="text-red-500" onClick={cancelUpdate}>
                انصراف
              </button>
            )}
          </div>
        )}
      </form>
      <hr />
      <Appointments
        appointments={appointments}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        isFetching={isFetching}
        setCurrentPage={setCurrentPage}
        searchedText={searchedText}
        dateRange={dateRange}
        onSearch={onSearch}
        loading={appointmentsQueryLoading}
        error={appointmentsQueryError}
        setDateRange={setDateRange}
        setSearchedText={setSearchedText}
        updateAppointment={updateAppointment}
        updateMode={updateMode}
        deleteMode={deleteMode}
        setItemToDelete={setItemToDelete}
        deleteAppointment={deleteAppointment}
        setDeleteMode={setDeleteMode}
        onDeletion={onDeletion}
        setItemToUpdate={setItemToUpdate}
        onClearSearch={onClearSearch}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
      />
      <hr />
      <OpenHourSetter />
      <hr />
      <WaitingTimeSetter
        data={waitingTime}
        error={waitingTimeError}
        loading={waitingTimeLoading}
      />
      <hr />
      <ClosedWeekDaysSetter
        data={closedWeekDays}
        loading={closedWeekDaysLoading}
        error={closedWeekDaysError}
        refetch={refetchClosedWeekDays}
      />
      <hr />
      <CloseDatesSetter
        data={closedDates}
        loading={closedDatesLoading}
        error={closedDatesError}
        refetch={refetchClosedDates}
      />
    </div>
  );
};

export default dashboard;
