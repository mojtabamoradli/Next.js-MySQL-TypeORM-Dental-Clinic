import React, { useState } from "react";
import Pagination from "@/utils/Pagination";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";

const Appointments = ({
  backToMenu,
  appointments,
  handleItemsPerPageChange,
  itemsPerPage,
  currentPage,
  isFetching,
  setCurrentPage,
  searchedText,
  dateRange,
  onSearch,
  loading,
  error,
  setDateRange,
  setSearchedText,
  updateAppointment,
  updateMode,
  deleteMode,
  setItemToDelete,
  deleteAppointment,
  setDeleteMode,
  onDeletion,
  setItemToUpdate,
  onClearSearch,
  setIsSearching,
  isSearching,
}) => {
  return loading ? (
    "در حال دریافت اطلاعات..."
  ) : appointments?.data?.length == 0 && isSearching ? (
    "نتیجه‌ای یافت نشد."
  ) : appointments?.data?.length == 0 && !isSearching ? (
    "هیچ وقت مشاوره‌ای ثبت نشده است."
  ) : appointments?.data?.length ? (
    <div className="bg-white">
      <div className="flex max-md:flex-col max-md:gap-2 justify-between my-2">
        <div className="flex  gap-2 w-full items-center">
          {/* <button className="p-2 rounded-lg bg-[#29D8DB]" onClick={backToMenu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="#ffffff"
              />
              <path
                d="M10.7399 16.28C10.5499 16.28 10.3599 16.21 10.2099 16.06C9.91993 15.77 9.91993 15.29 10.2099 15L13.2099 12L10.2099 9.00003C9.91993 8.71003 9.91993 8.23003 10.2099 7.94003C10.4999 7.65003 10.9799 7.65003 11.2699 7.94003L14.7999 11.47C15.0899 11.76 15.0899 12.24 14.7999 12.53L11.2699 16.06C11.1199 16.21 10.9299 16.28 10.7399 16.28Z"
                fill="#ffffff"
              />
            </svg>
          </button> */}
          <input
            className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg max-md:w-full w-[250px] h-[40px] pr-[10px]`}
            value={searchedText}
            onChange={(event) => {
              setSearchedText(event.target.value);
              setIsSearching(false);
            }}
            placeholder="نام، نام خانوادگی یا شماره تماس"
          />

          <DatePicker
            className="rmdp-mobile w-full"
            value={dateRange}
            onChange={(event) => {
              setDateRange(event);
              setIsSearching(false);
            }}
            range
            calendar={persian}
            locale={persian_fa}
            render={
              <input
                placeholder="از تاریخ ~ تا تاریخ"
                className="font-Irancell_Light border-[1px]  focus:outline-[#29D8DB] rounded-lg max-md:w-full w-[250px] h-[40px] pr-[10px]"
              />
            }
          />
          <button
            className="bg-[#29D8DB] h-[40px] rounded-lg max-md:w-full text-white px-2"
            disabled={
              (dateRange?.length == 1 && !searchedText) ||
              (dateRange?.length == 1 && searchedText) ||
              (!dateRange?.length && !searchedText)
            }
            onClick={onSearch}
          >
            جست‌وجو
          </button>
          {(dateRange?.length || searchedText) && (
            <button
              className="bg-red-500 rounded-lg text-white px-2 max-md:w-full h-[40px] whitespace-nowrap"
              onClick={onClearSearch}
            >
              پاک کردن
            </button>
          )}
          {isFetching && <p>در حال دریافت اطلاعات...</p>}
        </div>
        <div className="flex whitespace-nowrap items-center gap-2 bg-[#29D8DB] px-2 h-[40px] rounded-lg text-white max-md:justify-center">
          <label className="md:hidden" htmlFor="itemsPerPage">
            تعداد در هر صفحه
          </label>
          <select
            className="bg-[#29D8DB] focus:outline-none"
            name="itemsPerPage"
            id="itemsPerPage"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="5">۵</option>
            <option value="10">۱۰</option>
            <option value="15">۱۵</option>
          </select>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white overflow-x-auto">
          <thead className=" text-white ">
            <tr className="h-[45px] ">
              <th className="bg-[#29D8DB]  max-md:hidden rounded-tr-lg">
                شناسه
              </th>
              <th className="bg-[#29D8DB]  max-md:rounded-tr-lg">نام</th>
              <th className="bg-[#29D8DB]  ">موبایل</th>
              <th className="bg-[#29D8DB]  ">زمان</th>
              <th className="bg-[#29D8DB] "></th>
              <th className="bg-[#29D8DB]  rounded-tl-lg"></th>
            </tr>
          </thead>
          <tbody className="font-Irancell_Light bg-gray-50 ">
            {appointments.data?.map((appointment) => (
              <tr className="" key={appointment.id}>
                <td className=" max-md:hidden">{appointment.id}</td>
                <td className="max-md:text-[12px]">{appointment.firstName} {appointment.lastName}</td>
                <td className="max-md:text-[12px]">
                  {convertEnglishNumbersToPersian(appointment.mobileNumber)}
                </td>
                <td className="max-md:text-[12px]">
                  {convertEnglishNumbersToPersian(
                    new Date(+appointment.date * 1000).toLocaleTimeString(
                      "fa-IR-u-nu-latn",
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  ) +
                    " - " +
                    convertEnglishNumbersToPersian(
                      new Date(+appointment.date * 1000).toLocaleDateString(
                        "fa-IR-u-nu-latn"
                      )
                    )}
                </td>
                <td>
                  {updateAppointment.isLoading &&
                  updateAppointment.variables === appointment.id ? (
                    "..."
                  ) : (
                    <button
                      disabled={appointment.id === updateMode.id}
                      className="text-orange-500 disabled:text-gray-300 m-2"
                      onClick={() => setItemToUpdate(appointment)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                          fill={
                            appointment.id === updateMode.id
                              ? "#00000090"
                              : "#f97316"
                          }
                        />
                        <path
                          d="M8.50002 17.69C7.89002 17.69 7.33002 17.47 6.92002 17.07C6.43002 16.58 6.22002 15.87 6.33002 15.12L6.76002 12.11C6.84002 11.53 7.22002 10.78 7.63002 10.37L15.51 2.49C17.5 0.499998 19.52 0.499998 21.51 2.49C22.6 3.58 23.09 4.69 22.99 5.8C22.9 6.7 22.42 7.58 21.51 8.48L13.63 16.36C13.22 16.77 12.47 17.15 11.89 17.23L8.88002 17.66C8.75002 17.69 8.62002 17.69 8.50002 17.69ZM16.57 3.55L8.69002 11.43C8.50002 11.62 8.28002 12.06 8.24002 12.32L7.81002 15.33C7.77002 15.62 7.83002 15.86 7.98002 16.01C8.13002 16.16 8.37002 16.22 8.66002 16.18L11.67 15.75C11.93 15.71 12.38 15.49 12.56 15.3L20.44 7.42C21.09 6.77 21.43 6.19 21.48 5.65C21.54 5 21.2 4.31 20.44 3.54C18.84 1.94 17.74 2.39 16.57 3.55Z"
                          fill={
                            appointment.id === updateMode.id
                              ? "#00000090"
                              : "#f97316"
                          }
                        />
                        <path
                          d="M19.85 9.83003C19.78 9.83003 19.71 9.82003 19.65 9.80003C17.02 9.06003 14.93 6.97003 14.19 4.34003C14.08 3.94003 14.31 3.53003 14.71 3.41003C15.11 3.30003 15.52 3.53003 15.63 3.93003C16.23 6.06003 17.92 7.75003 20.05 8.35003C20.45 8.46003 20.68 8.88003 20.57 9.28003C20.48 9.62003 20.18 9.83003 19.85 9.83003Z"
                          fill={
                            appointment.id === updateMode.id
                              ? "#00000090"
                              : "#f97316"
                          }
                        />
                      </svg>
                    </button>
                  )}
                </td>
                <td>
                  {deleteMode.id !== appointment.id && (
                    <button
                      className="text-red-500 m-2"
                      onClick={() => setItemToDelete(appointment.id)}
                    >
                      <svg
                        width="24"
                        height="24"
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
                    </button>
                  )}

                  {deleteMode.status && deleteMode.id === appointment.id && (
                    <>
                      {deleteAppointment.isLoading &&
                      deleteAppointment.variables === appointment.id ? (
                        "..."
                      ) : (
                        <button
                          className="text-red-500 m-2"
                          onClick={() => onDeletion(appointment.id)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                              fill="#2fc55e"
                            />
                            <path
                              d="M10.58 15.58C10.38 15.58 10.19 15.5 10.05 15.36L7.22 12.53C6.93 12.24 6.93 11.76 7.22 11.47C7.51 11.18 7.99 11.18 8.28 11.47L10.58 13.77L15.72 8.62998C16.01 8.33998 16.49 8.33998 16.78 8.62998C17.07 8.91998 17.07 9.39998 16.78 9.68998L11.11 15.36C10.97 15.5 10.78 15.58 10.58 15.58Z"
                              fill="#2fc55e"
                            />
                          </svg>
                        </button>
                      )}
                      {!deleteAppointment.isLoading && (
                        <button
                          className="text-red-500 m-2"
                          onClick={() =>
                            setDeleteMode({ status: false, id: null })
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L14.3 8.63999C14.59 8.34999 15.07 8.34999 15.36 8.63999C15.65 8.92999 15.65 9.40998 15.36 9.69998L9.7 15.36C9.56 15.51 9.36 15.58 9.17 15.58Z"
                              fill="#ef4444"
                            />
                            <path
                              d="M14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L8.64 9.69998C8.35 9.40998 8.35 8.92999 8.64 8.63999C8.93 8.34999 9.41 8.34999 9.7 8.63999L15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58Z"
                              fill="#ef4444"
                            />
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                              fill="#ef4444"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={appointments?.totalPages}
        pageInstances={5}
        fetching={isFetching}
      />
    </div>
  ) : (
    error && "خطا در دریافت اطلاعات"
  );
};

export default Appointments;
