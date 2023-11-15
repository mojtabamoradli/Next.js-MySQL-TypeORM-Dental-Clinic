import { useEffect } from "react";
import { useNotification } from "../zustand/notification";

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    notifications?.forEach((notification) => {
      const timerId = setTimeout(() => {
        removeNotification(notification);
      }, 8000);

      return () => clearTimeout(timerId);
    });
  }, [notifications]);

  return (
    <>
      {notifications?.map((notification, index) => (
        <div key={index} className={`font-Irancell_Light text-[14px] z-[5000] top-[20px] fixed mx-auto left-0 right-0 w-fit max-w-[300px] min-h-[35px] h-fit py-[5px] px-[10px] content-center items-center text-center rounded-[4px] ${notification.type === "info" ? "bg-gray-900 text-gray-100" : notification.type === "error" ? "bg-red-600 text-gray-100" : notification.type === "warning" ? "bg-orange-600 text-gray-100" : notification.type === "success" && "bg-green-600 text-gray-100"}   translate-y-[-60px] opacity-0 animate-fadeIn`}>
          <p className={`items-center mt-1`}>{notification.message}</p>
        </div>
      ))}
    </>
  );
};

export default Notification;
