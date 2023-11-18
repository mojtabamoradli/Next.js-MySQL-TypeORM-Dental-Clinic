import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { registerSchema } from "@/validations/register";
import axios from "axios";
import { useNotification } from "@/zustand/notification";

const defaultValues = {
  fullName: "",
  mobileNumber: "",
  password: "",
};

const Register = () => {
  const { addNotification } = useNotification();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const createUser = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/account/register", data);
    },
    onSuccess: () => {
      reset(defaultValues);
      addNotification({
        type: "success",
        message: "مدیر با موفقیت ایجاد شد.",
      });
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  const onSubmit = (data) => {
    createUser.mutate(data);
  };

  return (
    <div className="flex w-fit justify-center mx-auto shadow-custom rounded-xl p-6">
      <form
        className="flex flex-col gap-1 w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3 w-[300px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">نام و نام خانوادگی</label>
            <input
              disabled={createUser.isLoading}
              type="text"
              id="fullName"
              {...register("fullName")}
              className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]  ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mobileNumber">شماره تماس</label>
            <input
              disabled={createUser.isLoading}
              type="text"
              id="mobileNumber"
              {...register("mobileNumber")}
              className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]  ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">رمز عبور</label>
            <input
              disabled={createUser.isLoading}
              type="password"
              id="password"
              {...register("password")}
              className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]  ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col my-2 gap-1 text-red-500 font-Irancell_Light text-[12px]">
          <p>{errors.mobileNumber?.message}</p>
          <p>{errors.password?.message}</p>
          <p>{errors.fullName?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-[#29D8DB] w-[300px] h-[45px] items-center gap-2 text-white transition-all duration-300 px-4 rounded-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
        >
          {createUser.isLoading ? "..." : "ایجاد مدیر"}
        </button>
      </form>
    </div>
  );
};

export default Register;
