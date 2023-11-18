import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNotification } from "@/zustand/notification";

const ClosedWeekDaysSetter = ({ data, loading, error, refetch }) => {
  const { addNotification } = useNotification();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(data);
  }, [data]);

  const options = [
    { value: 0, label: "شنبه" },
    { value: 1, label: "یکشنبه" },
    { value: 2, label: "دوشنبه" },
    { value: 3, label: "سه‌شنبه" },
    { value: 4, label: "چهارشنبه" },
    { value: 5, label: "پنج‌شنبه" },
    { value: 6, label: "جمعه" },
  ];

  const handleCheckboxChange = (value) => {
    if (selectedOptions?.includes(value)) {
      setSelectedOptions(selectedOptions?.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const updateClosedWeekDays = useMutation({
    mutationFn: () => {
      return axios.patch(`/api/closedWeekDays/update`, {
        closedWeekDays: selectedOptions,
      });
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "روزهای تعطیل هفته ویرایش شدند",
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

  return (

  <div className="text-center">
    {data ? (
      <div className="flex flex-col justify-center items-center text-center  ">
        <p className="flex text-center justify-center bg-[#29D8DB] text-white h-[45px] rounded-t-lg items-center w-[300px]">
          روزهای تعطیل کلینیک در هفته
        </p>

        <table className=" w-[300px] justify-around items-center mx-auto">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="font-Irancell_Light bg-gray-50">
            {options?.map((option) => (
              <tr key={option.value}>
                <td>{option.label}</td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions?.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="bg-[#29D8DB] w-[300px] h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-b-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
          onClick={() => updateClosedWeekDays.mutate()}
          disabled={updateClosedWeekDays.isLoading}
        >
          {updateClosedWeekDays.isLoading ? "..." : "ویرایش"}
        </button>
      </div>
    ) : loading ? (
      "در حال دریافت اطلاعات..."
    ) : (
      error && "خطا در دریافت روزهای تعطیل هفته"
    )}
  </div>
  )
};

export default ClosedWeekDaysSetter;
