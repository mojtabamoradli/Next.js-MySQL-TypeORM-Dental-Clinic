import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";
import axios from "axios";
import { useNotification } from "@/zustand/notification";
import { useRouter } from "next/router";
import { loginSchema } from "@/validations/login";
import Head from "next/head";
import Image from "next/image";

const defaultValues = {
  mobileNumber: "",
  password: "",
};

const Account = () => {
  const { addNotification } = useNotification();
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const login = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/account/login", data);
    },
    onSuccess: () => {
      reset(defaultValues);
      addNotification({
        type: "success",
        message: "ورود موفق",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      addNotification({
        type: "error",
        message: "خطایی رخ داد. دوباره تلاش کنید",
      });
    },
  });

  const onSubmit = (data) => {
    login.mutate(data);
  };

  return (
    
    <div className="account flex absolute flex-col w-full h-full text-center justify-center mx-auto left-[50%] top-[50%]  text-gray-900 translate-x-[-50%] translate-y-[-50%]">
                  <Head>
        <title>ورود به پنل مدیریت</title>
      </Head>
      <div className="flex justify-center mb-3  items-center">
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
      <div className="w-fit h-fit  justify-center mx-auto px-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 w-full min-w-[280px] h-full shadow-custom rounded-xl text-right flex flex-col gap-2">
          <div className="w-full mb-3 text-center text-[20px]">
            <p className="text-[#29D8DB]">ورود به پنل مدیریت</p>
            <div className="bg-[#29D8DB] w-full h-[2px] rounded-[50%] mb-[10px] mt-[10px]"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="mobileNumber">شماره تماس</label>
              <input
                className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] text-left rounded-lg w-full h-[40px] pl-[10px]
            ${errors.mobileNumber ? "border-red-500" : "border-gray-300"}`}
                disabled={login.isLoading}
                type="text"
                id="mobileNumber"
                {...register("mobileNumber")}
                value={convertEnglishNumbersToPersian(watch("mobileNumber"))}
              />
            </div>
            <div>
              <label htmlFor="password">رمز عبور</label>
              <input
                className={`font-Irancell_Light border-[1px] focus:outline-[#29D8DB] rounded-lg w-full h-[40px] pr-[10px]
                      ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                disabled={login.isLoading}
                type="password"
                id="password"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col gap-1 text-red-500 font-Irancell_Light text-[12px]">
              <p>{errors.mobileNumber?.message}</p>
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <div className="text-center justify-center">
  
              <button
                className="bg-[#29D8DB] w-full h-[45px] items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-[#29d8dbcf] text-center justify-center "
                type="submit"
              >
                {login.isLoading ? "..." : "ورود"}
              </button>
            
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Account;


Account.getLayout = (page) => {
  return <>{page}</>;
};