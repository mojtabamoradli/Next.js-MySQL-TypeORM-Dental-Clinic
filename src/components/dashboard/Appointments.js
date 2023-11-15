import React, { useState } from "react";
import Pagination from "@/utils/Pagination";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";

const Appointments = ({
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
    "..."
  ) : appointments?.data?.length == 0 && isSearching ? (
    "نتیجه‌ای یافت نشد."
  ) : appointments?.data?.length == 0 && !isSearching ? (
    "هیچ وقت مشاوره‌ای ثبت نشده است."
  ) : appointments?.data?.length ? (
    <div>
      <div>
        <input
          value={searchedText}
          onChange={(event) => {
            setSearchedText(event.target.value);
            setIsSearching(false);
          }}
          placeholder="نام، نام خانوادگی یا شماره تماس"
        />

        <DatePicker
          className="rmdp-mobile"
          value={dateRange}
          onChange={(event) => {
            setDateRange(event);
            setIsSearching(false);
          }}
          range
          calendar={persian}
          locale={persian_fa}
          placeholder="از تاریخ ~ تا تاریخ"
        />
        <button
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
          <button onClick={onClearSearch}>پاک کردن</button>
        )}
      </div>
      <div>
        {appointments.data?.map((appointment) => (
          <div key={appointment.id} className="flex gap-2">
            <span>{appointment.id}</span>
            <span>{appointment.firstName}</span>
            <span>{appointment.lastName}</span>
            <span>
              {convertEnglishNumbersToPersian(appointment.mobileNumber)}
            </span>

            <span>
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
            </span>
            <span>
              {convertEnglishNumbersToPersian(
                new Date(+appointment.createdAt).toLocaleTimeString(
                  "fa-IR-u-nu-latn",
                  { hour: "2-digit", minute: "2-digit" }
                )
              ) +
                " - " +
                convertEnglishNumbersToPersian(
                  new Date(+appointment.createdAt).toLocaleDateString(
                    "fa-IR-u-nu-latn"
                  )
                )}
            </span>
            <span>
              {updateAppointment.isLoading &&
              updateAppointment.variables == appointment.id ? (
                "..."
              ) : (
                <button
                  disabled={appointment.id == updateMode.id}
                  className="text-orange-500 disabled:text-gray-300"
                  onClick={() => setItemToUpdate(appointment)}
                >
                  ویرایش
                </button>
              )}
            </span>

            {deleteMode.id != appointment.id && (
              <button
                className="text-red-500"
                onClick={() => setItemToDelete(appointment.id)}
              >
                حذف
              </button>
            )}

            {deleteMode.status && deleteMode.id == appointment.id && (
              <span>
                {deleteAppointment.isLoading &&
                deleteAppointment.variables == appointment.id ? (
                  "..."
                ) : (
                  <button
                    className="text-red-500"
                    onClick={() => onDeletion(appointment.id)}
                  >
                    حذف
                  </button>
                )}
                {!deleteAppointment.isLoading && (
                  <button
                    className="text-red-500"
                    onClick={() => setDeleteMode({ status: false, id: null })}
                  >
                    انصراف
                  </button>
                )}
              </span>
            )}
          </div>
        ))}
      </div>

      <label htmlFor="itemsPerPage">تعداد وقت‌ها در هر صفحه</label>
      <select
        name="itemsPerPage"
        id="itemsPerPage"
        onChange={handleItemsPerPageChange}
        value={itemsPerPage}
      >
        <option value="5">۵</option>
        <option value="10">۱۰</option>
        <option value="15">۱۵</option>
      </select>
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
