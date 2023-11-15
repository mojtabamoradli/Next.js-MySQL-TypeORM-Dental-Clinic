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

  return data ? (
    <div>
      <p>روزهای تعطیل کلینیک در هفته</p>

      <div>
        <strong>روزهای تعطیل:</strong>
        {options?.map((option) => (
          <label key={option.value} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions?.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <button onClick={() => updateClosedWeekDays.mutate()}>ویرایش</button>
    </div>
  ) : loading ? (
    "..."
  ) : (
    error && "خطا در دریافت روزهای تعطیل هفته"
  );
};

export default ClosedWeekDaysSetter;
