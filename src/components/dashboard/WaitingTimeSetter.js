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

  return (
    <div className="text-center">
      {data ? (
        <div className="flex flex-col justify-center items-center text-center  ">
          <p className="flex text-center justify-center bg-[#29D8DB] text-white h-[45px] rounded-t-lg items-center w-[300px]">
            زمان بین هر دو وقت ویزیت (دقیقه)
          </p>
          <div className="bg-gray-50 w-[300px] py-4">
            <input
              type="text"
              value={waitingTime}
              onChange={waitingTimeInputOnChange}
              disabled={updateWaitingTime.isLoading}
              className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg max-md:w-full w-[70px] h-[40px]  text-center`}
            />
          </div>
    
          <button
            className="bg-[#29D8DB] w-[300px] h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-b-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
            onClick={update}
            disabled={updateWaitingTime.isLoading}
          >
            {updateWaitingTime.isLoading ? "..." : "ویرایش"}
          </button>
        </div>
      ) : loading ? (
        "..."
      ) : (
        error && "خطا در دریافت زمان بین هر دو وقت مشاوره"
      )}

    </div>
  )
  
};

export default WaitingTimeSetter;
