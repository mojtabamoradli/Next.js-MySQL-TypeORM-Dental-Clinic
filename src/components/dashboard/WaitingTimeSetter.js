import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNotification } from "@/zustand/notification";

const WaitingTimeSetter = ({ data, error, loading }) => {
  const { addNotification } = useNotification();

  const [waitingTime, setWaitingTime] = useState(data);

  const updateWaitingTime = useMutation({
    mutationFn: () => {
      return axios.patch(`/api/waitingTime/update`, {
        waitingTime: waitingTime,
      });
    },
    onSuccess: () => {
      addNotification({
        type: "success",
        message: "وقت مشاوره ویرایش شد",
      });
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  const update = () => {
    updateWaitingTime.mutate();
  };

  const waitingTimeInputOnChange = (event) => {
    setWaitingTime(event.target.value);
  };

  useEffect(() => {
    setWaitingTime(data);
  }, [data]);

  return data ? (
    <div>
      <p>زمان بین هر دو وقت مشاوره</p>

      <input
        type="text"
        value={waitingTime}
        onChange={waitingTimeInputOnChange}
        disabled={updateWaitingTime.isLoading}
      />
      {updateWaitingTime.isLoading ? (
        "..."
      ) : (
        <button onClick={update}>ویرایش</button>
      )}
    </div>
  ) : loading ? (
    "..."
  ) : (
    error && "خطا در دریافت زمان بین هر دو وقت مشاوره"
  );
};

export default WaitingTimeSetter;
