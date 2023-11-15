import React from "react";
import { useNotification } from "@/zustand/notification";

const account = () => {
  const { addNotification } = useNotification();

  return <div>
     account
     <button onClick={() => addNotification({ type: "success", message: "تست" })}>Add Notification</button>
     </div>;
};

export default account;
