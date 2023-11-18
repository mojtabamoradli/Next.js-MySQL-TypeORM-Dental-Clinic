import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const MobileMenu = ({ open, close }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath) close();
  }, [router.asPath]);

  return (
    <div
      onClick={close}
      className={`${
        open &&
        "bg-[#00000020] fixed left-0 w-[100%] h-[100%] top-0 overflow-clip"
      } flex mx-auto justify-center transition-all duration-300 z-[100]`}
    >
      <div
        className={`fixed inset-0   ${
          open
            ? "transform translate-x-0"
            : "transform translate-x-full opacity-0"
        } transition-transform duration-300 `}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className={`bg-[#ffffff]  fixed top-0 w-[320px] h-full shadow font-Irancell_Light  cursor-auto`}
        >
          <div className="w-full flex justify-between items-center">
            <div></div>
            <button
              className="rotate-45 hover-opacity-70 transition-all duration-300"
              onClick={close}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                  fill="#000000"
                />
                <path
                  d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col justify-between  items-center gap-2">
            <div className="flex flex-col w-[100px] h-[100px] justify-center items-center max-sm:mx-auto max-sm:mt-4">
              <Image src="/images/logo.png" width={200} height={200} />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push("/")}
                className="hover:text-[#29D8DB] transition-all duration-300"
              >
                ویزیت
              </button>
              <Link
                href="#about-us"
                className="hover:text-[#29D8DB] transition-all duration-300"
              >
                درباره ما
              </Link>
              <Link
                href="#services"
                className="hover:text-[#29D8DB] transition-all duration-300"
              >
                خدمات
              </Link>
            </div>
            <div>
              <Link
                href="#contact-us"
                className="bg-[#29D8DB] group items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-white border-[1px] border-[#29D8DB] hover:border-[1px] hover:border-[#29D8DB] hover:text-[#29D8DB]"
              >
                تماس با ما
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                    className="fill-white group-hover:fill-[#29D8DB]"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
