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
import Register from "../components/account/Register";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const dashboard = ({ user }) => {
  const { addNotification } = useNotification();
  const router = useRouter();
  const [rerender, setRerender] = useState(false);

  const [tab, setTab] = useState({ status: false, id: null });

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

  const logout = useMutation({
    mutationFn: () => {
      return axios.get("/api/account/logout");
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "با موفقیت خارج شدید.",
      });
      router.push("/");
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  const backToMenu = () => {
    setTab({ status: false, id: null });
  };

  return (
    <div className={`account w-full h-[100svh]`}>
            <Head>
        <title>پنل مدیریت کلینیک</title>
      </Head>
      <div className="flex w-full flex-col py-10 h-fit mx-auto justify-center items-center max-w-[1000px] px-10">
        <div className="flex w-full justify-between items-center max-sm:flex-col">
          <div className="flex  items-center mb-5">
            <Image
              onClick={() => router.push("/")}
              className="w-[100px] max-sm:w-[70px] h-auto cursor-pointer"
              src="/images/logo.png"
              width={200}
              height={200}
            />
            <p
              onClick={() => router.push("/")}
              className="flex flex-col whitespace-nowrap cursor-pointer"
            >
              <span>کلینیک دندانپزشکی</span>
              <span>دکتر علی علائی</span>
            </p>
          </div>
          <div className="w-full max-w-[300px] text-center">
            <div className="flex items-center justify-end ">
              {tab.status && (
                <div className="flex gap-2 items-center">
                <p>{tab.id == 1 ? "ویزیت‌ها" : tab.id == 2 ? "ساعت کاری" : tab.id == 3 ? "زمان ویزیت" : tab.id == 4 ? "روزهای تعطیل" : tab.id ==5 ? "افزودن مدیر" : tab.id==6 && "روزهای کاری"}</p>
                <svg
                  className="cursor-pointer rotate-180"
                  onClick={backToMenu}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4301 18.82C14.2401 18.82 14.0501 18.75 13.9001 18.6C13.6101 18.31 13.6101 17.83 13.9001 17.54L19.4401 12L13.9001 6.46C13.6101 6.17 13.6101 5.69 13.9001 5.4C14.1901 5.11 14.6701 5.11 14.9601 5.4L21.0301 11.47C21.3201 11.76 21.3201 12.24 21.0301 12.53L14.9601 18.6C14.8101 18.75 14.6201 18.82 14.4301 18.82Z"
                    fill="#292D32"
                  />
                  <path
                    d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                    fill="#292D32"
                  />
                </svg>
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
        {!tab.status && (
          <div className="grid max-sm:grid-cols-1 sm:grid-cols-4 gap-4 w-full">
            <button
              className="bg-white flex flex-col gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 1 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 18.25H10C9.59 18.25 9.25 17.91 9.25 17.5C9.25 17.09 9.59 16.75 10 16.75H14C14.41 16.75 14.75 17.09 14.75 17.5C14.75 17.91 14.41 18.25 14 18.25Z"
                  fill="#292D32"
                />
                <path
                  d="M2 18.25C1.59 18.25 1.25 17.91 1.25 17.5V7.5C1.25 3.09 2.59 1.75 7 1.75C7.41 1.75 7.75 2.09 7.75 2.5C7.75 2.91 7.41 3.25 7 3.25C3.43 3.25 2.75 3.92 2.75 7.5V17.5C2.75 17.91 2.41 18.25 2 18.25Z"
                  fill="#292D32"
                />
                <path
                  d="M22 18.25C21.59 18.25 21.25 17.91 21.25 17.5V7.5C21.25 3.92 20.57 3.25 17 3.25C16.59 3.25 16.25 2.91 16.25 2.5C16.25 2.09 16.59 1.75 17 1.75C21.41 1.75 22.75 3.09 22.75 7.5V17.5C22.75 17.91 22.41 18.25 22 18.25Z"
                  fill="#292D32"
                />
                <path
                  d="M7.2 22.7501H4.8C2.38 22.7501 1.25 21.6201 1.25 19.2001V15.9101C1.25 13.4901 2.38 12.3601 4.8 12.3601H7.2C9.62 12.3601 10.75 13.4901 10.75 15.9101V19.2001C10.75 21.6201 9.62 22.7501 7.2 22.7501ZM4.8 13.8601C3.21 13.8601 2.75 14.3201 2.75 15.9101V19.2001C2.75 20.7901 3.21 21.2501 4.8 21.2501H7.2C8.79 21.2501 9.25 20.7901 9.25 19.2001V15.9101C9.25 14.3201 8.79 13.8601 7.2 13.8601H4.8Z"
                  fill="#292D32"
                />
                <path
                  d="M19.2 22.7501H16.8C14.38 22.7501 13.25 21.6201 13.25 19.2001V15.9101C13.25 13.4901 14.38 12.3601 16.8 12.3601H19.2C21.62 12.3601 22.75 13.4901 22.75 15.9101V19.2001C22.75 21.6201 21.62 22.7501 19.2 22.7501ZM16.8 13.8601C15.21 13.8601 14.75 14.3201 14.75 15.9101V19.2001C14.75 20.7901 15.21 21.2501 16.8 21.2501H19.2C20.79 21.2501 21.25 20.7901 21.25 19.2001V15.9101C21.25 14.3201 20.79 13.8601 19.2 13.8601H16.8Z"
                  fill="#292D32"
                />
              </svg>

              <p className="px-2">ویزیت‌ها </p>
            </button>
            <button
              className="bg-white flex flex-col gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 2 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                  fill="#292D32"
                />
                <path
                  d="M15.71 15.93C15.58 15.93 15.45 15.9 15.33 15.82L12.23 13.97C11.46 13.51 10.89 12.5 10.89 11.61V7.51001C10.89 7.10001 11.23 6.76001 11.64 6.76001C12.05 6.76001 12.39 7.10001 12.39 7.51001V11.61C12.39 11.97 12.69 12.5 13 12.68L16.1 14.53C16.46 14.74 16.57 15.2 16.36 15.56C16.21 15.8 15.96 15.93 15.71 15.93Z"
                  fill="#292D32"
                />
              </svg>

              <p className="px-2"> ساعت کاری</p>
            </button>
            <button
              className="bg-white flex flex-col px-6 whitespace-nowrap gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 3 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.75C6.76 22.75 2.5 18.49 2.5 13.25C2.5 8.01 6.76 3.75 12 3.75C17.24 3.75 21.5 8.01 21.5 13.25C21.5 13.66 21.16 14 20.75 14C20.34 14 20 13.66 20 13.25C20 8.84 16.41 5.25 12 5.25C7.59 5.25 4 8.84 4 13.25C4 17.66 7.59 21.25 12 21.25C12.41 21.25 12.75 21.59 12.75 22C12.75 22.41 12.41 22.75 12 22.75Z"
                  fill="#292D32"
                />
                <path
                  d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z"
                  fill="#292D32"
                />
                <path
                  d="M15 2.75H9C8.59 2.75 8.25 2.41 8.25 2C8.25 1.59 8.59 1.25 9 1.25H15C15.41 1.25 15.75 1.59 15.75 2C15.75 2.41 15.41 2.75 15 2.75Z"
                  fill="#292D32"
                />
                <path
                  d="M19 21.75C18.59 21.75 18.25 21.41 18.25 21V17C18.25 16.59 18.59 16.25 19 16.25C19.41 16.25 19.75 16.59 19.75 17V21C19.75 21.41 19.41 21.75 19 21.75Z"
                  fill="#292D32"
                />
                <path
                  d="M16 21.75C15.59 21.75 15.25 21.41 15.25 21V17C15.25 16.59 15.59 16.25 16 16.25C16.41 16.25 16.75 16.59 16.75 17V21C16.75 21.41 16.41 21.75 16 21.75Z"
                  fill="#292D32"
                />
              </svg>

              <p className="px-2">زمان ویزیت</p>
            </button>
            <button
              className="bg-white flex flex-col gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 4 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                  fill="#292D32"
                />
                <path
                  d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                  fill="#292D32"
                />
                <path
                  d="M15 22.75H9C3.38 22.75 2.25 20.1 2.25 15.82V9.65C2.25 4.91 3.85 2.98 7.96 2.75H16C16.01 2.75 16.03 2.75 16.04 2.75C20.15 2.98 21.75 4.91 21.75 9.65V15.82C21.75 20.1 20.62 22.75 15 22.75ZM8 4.25C5.2 4.41 3.75 5.29 3.75 9.65V15.82C3.75 19.65 4.48 21.25 9 21.25H15C19.52 21.25 20.25 19.65 20.25 15.82V9.65C20.25 5.3 18.81 4.41 15.98 4.25H8Z"
                  fill="#292D32"
                />
                <path
                  d="M20.75 18.3501H3.25C2.84 18.3501 2.5 18.0101 2.5 17.6001C2.5 17.1901 2.84 16.8501 3.25 16.8501H20.75C21.16 16.8501 21.5 17.1901 21.5 17.6001C21.5 18.0101 21.16 18.3501 20.75 18.3501Z"
                  fill="#292D32"
                />
                <path
                  d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z"
                  fill="#292D32"
                />
              </svg>

              <p> روزهای تعطیل</p>
            </button>
            <button
              className="bg-white flex flex-col gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 5 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                  fill="#292D32"
                />
                <path
                  d="M3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C13.0102 14.25 14.0001 14.38 14.9601 14.65C15.3601 14.76 15.5902 15.17 15.4802 15.57C15.3702 15.97 14.9601 16.2 14.5602 16.09C13.7402 15.86 12.8802 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75Z"
                  fill="#292D32"
                />
                <path
                  d="M18 22.75C16.82 22.75 15.7 22.31 14.83 21.52C14.48 21.22 14.17 20.85 13.93 20.44C13.49 19.72 13.25 18.87 13.25 18C13.25 16.75 13.73 15.58 14.59 14.69C15.49 13.76 16.7 13.25 18 13.25C19.36 13.25 20.65 13.83 21.53 14.83C22.31 15.7 22.75 16.82 22.75 18C22.75 18.38 22.7 18.76 22.6 19.12C22.5 19.57 22.31 20.04 22.05 20.45C21.22 21.87 19.66 22.75 18 22.75ZM18 14.75C17.11 14.75 16.29 15.1 15.67 15.73C15.08 16.34 14.75 17.14 14.75 18C14.75 18.59 14.91 19.17 15.22 19.67C15.38 19.95 15.59 20.2 15.83 20.41C16.43 20.96 17.2 21.26 18 21.26C19.13 21.26 20.2 20.66 20.78 19.69C20.95 19.41 21.08 19.09 21.15 18.78C21.22 18.52 21.25 18.27 21.25 18.01C21.25 17.21 20.95 16.44 20.41 15.84C19.81 15.14 18.93 14.75 18 14.75Z"
                  fill="#292D32"
                />
                <path
                  d="M19.4998 18.73H16.5098C16.0998 18.73 15.7598 18.39 15.7598 17.98C15.7598 17.57 16.0998 17.23 16.5098 17.23H19.4998C19.9098 17.23 20.2498 17.57 20.2498 17.98C20.2498 18.39 19.9098 18.73 19.4998 18.73Z"
                  fill="#292D32"
                />
                <path
                  d="M18 20.26C17.59 20.26 17.25 19.92 17.25 19.51V16.52C17.25 16.11 17.59 15.77 18 15.77C18.41 15.77 18.75 16.11 18.75 16.52V19.51C18.75 19.93 18.41 20.26 18 20.26Z"
                  fill="#292D32"
                />
              </svg>

              <p className="px-2">افزودن مدیر </p>
            </button>
            <button
              className="bg-white flex flex-col gap-4 w-auto min-w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => setTab({ status: true, id: 6 })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                  fill="#292D32"
                />
                <path
                  d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                  fill="#292D32"
                />
                <path
                  d="M8.5 14.4999C8.24 14.4999 7.98 14.3899 7.79 14.2099C7.61 14.0199 7.5 13.7699 7.5 13.4999C7.5 13.3699 7.53 13.2399 7.58 13.1199C7.63 12.9999 7.7 12.89 7.79 12.79C8.16 12.42 8.83 12.42 9.21 12.79C9.39 12.98 9.5 13.2399 9.5 13.4999C9.5 13.5599 9.49 13.63 9.48 13.7C9.47 13.76 9.45 13.8199 9.42 13.8799C9.4 13.9399 9.37 13.9999 9.33 14.0599C9.29 14.1099 9.25 14.1599 9.21 14.2099C9.02 14.3899 8.76 14.4999 8.5 14.4999Z"
                  fill="#292D32"
                />
                <path
                  d="M12 14.5001C11.87 14.5001 11.74 14.4701 11.62 14.4201C11.49 14.3701 11.39 14.3001 11.29 14.2101C11.11 14.0201 11 13.7701 11 13.5001C11 13.3701 11.03 13.2401 11.08 13.1201C11.13 13.0001 11.2 12.8901 11.29 12.7901C11.39 12.7001 11.49 12.6301 11.62 12.5801C11.99 12.4301 12.43 12.5101 12.71 12.7901C12.89 12.9801 13 13.2401 13 13.5001C13 13.5601 12.99 13.6301 12.98 13.7001C12.97 13.7601 12.95 13.8201 12.92 13.8801C12.9 13.9401 12.87 14.0001 12.83 14.0601C12.8 14.1101 12.75 14.1601 12.71 14.2101C12.52 14.3901 12.26 14.5001 12 14.5001Z"
                  fill="#292D32"
                />
                <path
                  d="M8.5 18C8.37 18 8.24 17.97 8.12 17.92C7.99 17.87 7.88 17.8 7.79 17.71C7.7 17.62 7.63 17.51 7.58 17.38C7.53 17.26 7.5 17.13 7.5 17C7.5 16.87 7.53 16.74 7.58 16.62C7.63 16.49 7.7 16.38 7.79 16.29C7.88 16.2 7.99 16.13 8.12 16.08C8.36 15.98 8.64 15.97 8.88 16.08C9.01 16.13 9.12 16.2 9.21 16.29C9.3 16.38 9.37 16.49 9.42 16.62C9.47 16.74 9.5 16.87 9.5 17C9.5 17.13 9.47 17.26 9.42 17.38C9.37 17.51 9.3 17.62 9.21 17.71C9.12 17.8 9.01 17.87 8.88 17.92C8.76 17.97 8.63 18 8.5 18Z"
                  fill="#292D32"
                />
                <path
                  d="M20.5 9.83997H3.5C3.09 9.83997 2.75 9.49997 2.75 9.08997C2.75 8.67997 3.09 8.33997 3.5 8.33997H20.5C20.91 8.33997 21.25 8.67997 21.25 9.08997C21.25 9.49997 20.91 9.83997 20.5 9.83997Z"
                  fill="#292D32"
                />
                <path
                  d="M18 23.75C16.83 23.75 15.72 23.33 14.87 22.56C14.51 22.26 14.19 21.88 13.93 21.44C13.49 20.72 13.25 19.87 13.25 19C13.25 16.38 15.38 14.25 18 14.25C19.36 14.25 20.66 14.84 21.56 15.86C22.33 16.74 22.75 17.85 22.75 19C22.75 19.87 22.51 20.72 22.06 21.45C21.22 22.87 19.66 23.75 18 23.75ZM18 15.75C16.21 15.75 14.75 17.21 14.75 19C14.75 19.59 14.91 20.17 15.22 20.67C15.39 20.97 15.61 21.22 15.85 21.43C16.45 21.97 17.2 22.25 18 22.25C19.15 22.25 20.19 21.66 20.78 20.68C21.09 20.17 21.25 19.6 21.25 19C21.25 18.22 20.96 17.46 20.44 16.85C19.82 16.15 18.93 15.75 18 15.75Z"
                  fill="#292D32"
                />
                <path
                  d="M17.4299 20.74C17.2399 20.74 17.0499 20.67 16.8999 20.52L15.9099 19.53C15.6199 19.24 15.6199 18.7601 15.9099 18.4701C16.1999 18.1801 16.6799 18.1801 16.9699 18.4701L17.4499 18.9501L19.0499 17.4701C19.3499 17.1901 19.8299 17.2101 20.1099 17.5101C20.3899 17.8101 20.3699 18.2901 20.0699 18.5701L17.9399 20.5401C17.7899 20.6701 17.6099 20.74 17.4299 20.74Z"
                  fill="#292D32"
                />
                <path
                  d="M15.37 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V16.36C21.75 16.67 21.56 16.95 21.26 17.06C20.97 17.17 20.64 17.09 20.43 16.85C19.81 16.15 18.92 15.75 17.99 15.75C16.2 15.75 14.74 17.21 14.74 19C14.74 19.59 14.9 20.17 15.21 20.67C15.38 20.97 15.6 21.22 15.84 21.43C16.08 21.63 16.17 21.96 16.06 22.26C15.97 22.55 15.69 22.75 15.37 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H13.82C13.45 20.57 13.25 19.8 13.25 19C13.25 16.38 15.38 14.25 18 14.25C18.79 14.25 19.57 14.45 20.25 14.82V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
                  fill="#292D32"
                />
              </svg>

              <p className="px-2"> روزهای کاری</p>
            </button>
            <button
              className=" flex flex-col gap-4 w-auto min-w-[200px] text-red-500 cursor-pointer bg-red-100 h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300"
              onClick={() => logout.mutate()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.24 22.27H15.11C10.67 22.27 8.53002 20.52 8.16002 16.6C8.12002 16.19 8.42002 15.82 8.84002 15.78C9.25002 15.74 9.62002 16.05 9.66002 16.46C9.95002 19.6 11.43 20.77 15.12 20.77H15.25C19.32 20.77 20.76 19.33 20.76 15.26V8.73998C20.76 4.66998 19.32 3.22998 15.25 3.22998H15.12C11.41 3.22998 9.93002 4.41998 9.66002 7.61998C9.61002 8.02998 9.27002 8.33998 8.84002 8.29998C8.42002 8.26998 8.12001 7.89998 8.15001 7.48998C8.49001 3.50998 10.64 1.72998 15.11 1.72998H15.24C20.15 1.72998 22.25 3.82998 22.25 8.73998V15.26C22.25 20.17 20.15 22.27 15.24 22.27Z"
                  fill="#ef4444"
                />
                <path
                  d="M14.88 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H14.88C15.29 11.25 15.63 11.59 15.63 12C15.63 12.41 15.3 12.75 14.88 12.75Z"
                  fill="#ef4444"
                />
                <path
                  d="M12.6501 16.1C12.4601 16.1 12.2701 16.03 12.1201 15.88C11.8301 15.59 11.8301 15.11 12.1201 14.82L14.9401 12L12.1201 9.17997C11.8301 8.88997 11.8301 8.40997 12.1201 8.11997C12.4101 7.82997 12.8901 7.82997 13.1801 8.11997L16.5301 11.47C16.8201 11.76 16.8201 12.24 16.5301 12.53L13.1801 15.88C13.0301 16.03 12.8401 16.1 12.6501 16.1Z"
                  fill="#ef4444"
                />
              </svg>

              <p className="px-2">خروج</p>
            </button>
          </div>
        )}
      </div>
      
        <div className="flex flex-col justify-center w-full mx-auto max-w-[1000px] px-5">
        {tab.status && tab.id == 1 && (<div className="text-center ">
            <Appointments
              backToMenu={backToMenu}
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
            {updateMode.status && (
              <div className="w-full  my-10 ">
                <div className=" p-5 pt-10   max-w-[500px] mx-auto text-right shadow-custom rounded-lg">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 w-full max-sm:flex-col">
                        <div className="w-full max-sm:flex  max-sm:flex-col">
                          <label>نام:</label>
                          <input
                            className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]  ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
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
                              errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
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
                              errors.mobileNumber
                                ? "border-red-500"
                                : "border-gray-300"
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
                                return new Date(
                                  timestamp * 1000
                                ).toLocaleDateString("fa-IR-u-nu-latn");
                              };

                              if (
                                closedDates?.some(
                                  (i) =>
                                    formatDate(i) === formatDate(date?.unix)
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
                                  !watch("date")
                                    ? "text-white"
                                    : "text-gray-900"
                                } border-[1px]  rounded-lg w-full h-[40px] pr-[10px] ${
                                  errors.firstName
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-red-500 font-Irancell_Light text-[12px]">
                        {errors.firstName && (
                          <span>{errors.firstName.message}</span>
                        )}
                        {errors.lastName && (
                          <span>{errors.lastName.message}</span>
                        )}
                        {errors.mobileNumber && (
                          <span>{errors.mobileNumber.message}</span>
                        )}
                        {errors.date && <span>{errors.date.message}</span>}
                      </div>
                      <div>
                        {createAppointment.isLoading ? (
                          "..."
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="bg-[#29D8DB] w-full h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
                            >
                              {createAppointment.isLoading
                                ? "..."
                                : updateMode.id
                                ? "ویرایش ویزیت"
                                : "ثبت درخواست ویزیت"}
                            </button>
                            {updateMode.id && (
                              <button
                                onClick={() => cancelUpdate()}
                                className="bg-red-500 w-full h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
                              >
                                انصراف
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>)}

          {tab.status && tab.id == 2 && <OpenHourSetter />}

          {tab.status && tab.id == 3 && (
            <WaitingTimeSetter
              data={waitingTime}
              error={waitingTimeError}
              loading={waitingTimeLoading}
            />
          )}

          {tab.status && tab.id == 6 && (
            <ClosedWeekDaysSetter
              data={closedWeekDays}
              loading={closedWeekDaysLoading}
              error={closedWeekDaysError}
              refetch={refetchClosedWeekDays}
            />
          )}

          {tab.status && tab.id == 4 && (
            <CloseDatesSetter
              data={closedDates}
              loading={closedDatesLoading}
              error={closedDatesError}
              refetch={refetchClosedDates}
            />
          )}

          {tab.status && tab.id == 5 && <Register />}
        </div>
      
    </div>
  );
};

export default dashboard;

export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie) || "";
  const AuthToken = cookies.AuthToken;
  const user = verify(AuthToken, process.env.JWT_SECRET_KEY);

  return { props: { user } };
}

dashboard.getLayout = (page) => {
  return <>{page}</>;
};
