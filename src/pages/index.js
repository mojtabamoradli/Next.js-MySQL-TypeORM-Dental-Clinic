import Image from "next/image";
import AppointmentSetter from "@/components/AppointmentSetter";
import Head from "next/head";
export default function Home() {
  return (
    <main>
      <Head>
        <title>دندانپزشکی علی علائی</title>
      </Head>
      <div className="max-w-[1920px] w-full justify-center items-center mx-auto max-sm:mt-[60px]  bg-white">
        <div className="w-full h-full relative ">
          <Image
            src="/images/clinic1.webp"
            alt="Clinic Image"
            width={1000}
            height={1000}
            className="w-full h-[750px] object-cover z-0"
          />
          <div className="absolute top-0 right-0 w-[70%] h-[750px] bg-blue-400  z-50 opacity-80"></div>
          <div className="absolute top-0 left-0 w-[30%] h-[750px] bg-cyan-400 z-50 opacity-80"></div>
          <div className="absolute max-w-[1000px]  top-0 w-full h-full right-0 left-0 z-[60] justify-center sm:flex gap-2 sm:justify-between sm:px-10 items-center mx-auto">
            <h1 className="text-white text-[30px] max-sm:mt-[50px] max-sm:text-center ">
              <p>دکتر علی علائی</p>
              <p>جراح و دندانپزشک</p>
              <p>متخصص جراحی لثه و ایمپلنت</p>
            </h1>
            <div>
              <div className="flex max-sm:w-[90%] w-[450px] h-fit rounded-xl max-sm:mt-[20px] bg-white shadow justify-center mx-auto items-center z-[60]">
                <AppointmentSetter />
              </div>
            </div>
          </div>
        </div>

        <div id="about-us" className="flex max-sm:flex-col mt-10 mx-auto justify-center items-center sm:px-10 gap-10">
          <div className="flex gap-2 max-sm:w-[90%] sm:w-[400px]">
            <div className="w-[1000px]">
              <Image
                className="w-[500px] h-full shadow rounded-xl object-fill hover:grayscale-[100%] transition-all duration-300"
                src="/images/clinic2.jpg"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Image
                className="w-full h-full shadow rounded-xl object-fill hover:grayscale-[100%] transition-all duration-300"
                src="/images/clinic3.avif"
                width={500}
                height={500}
              />
              <Image
                className="w-full h-full shadow rounded-xl object-fill hover:grayscale-[100%] transition-all duration-300"
                src="/images/clinic4.jpg"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="flex flex-col sm:w-[50%] gap-2 max-w-[500px] max-sm:text-center">
            <p className="text-[30px] mb-3">لبخندی زیبا، هدیه‌ی ما به شما</p>
            <p className="font-Irancell_Light mb-10">
              دکتر علی علائی، جراح و دندانپزشک در تمامی مراحل حضور شما در محیط
              دندانپزشکی، فضایی آرام و درمانی با نهایت کیفیت را برای شما تضمین
              می‌کند.
            </p>
            <p className="font-Irancell_Light text-[#29D8DB]">
              شما عزیزان می‌توانید برای دریافت وقت ویزیت، همین الان با ما تماس
              بگیرید.
            </p>
            <div>
              <button className="bg-[#29D8DB] max-sm:justify-center max-sm:mx-auto group font-Irancell_Light items-center gap-2 text-white py-2 transition-all duration-300 px-4 rounded-xl flex hover:bg-white border-[1px] border-[#29D8DB] hover:border-[1px] hover:border-[#29D8DB] hover:text-[#29D8DB]">
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
              </button>
            </div>
          </div>
        </div>

        <div id="contact-us" className="bg-[#01578C] w-[90%] h-[100px] text-white rounded-xl flex max-sm:flex-col justify-around items-center mx-auto my-10">
          <p className="flex gap-2  ">
            برای مشاوره رایگان با ما تماس بگیرید
            <svg
              className="max-sm:hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.56994 18.82C9.37994 18.82 9.18994 18.75 9.03994 18.6L2.96994 12.53C2.67994 12.24 2.67994 11.76 2.96994 11.47L9.03994 5.4C9.32994 5.11 9.80994 5.11 10.0999 5.4C10.3899 5.69 10.3899 6.17 10.0999 6.46L4.55994 12L10.0999 17.54C10.3899 17.83 10.3899 18.31 10.0999 18.6C9.95994 18.75 9.75994 18.82 9.56994 18.82Z"
                fill="#ffffff"
              />
              <path
                d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
                fill="#ffffff"
              />
            </svg>
          </p>
          <button className="bg-[#29D8DB] flex gap-2 text-white py-2 px-4 rounded-xl whitespace-nowrap">
            ۰۲۱-۵۸۳۹۵۰۶۷
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
          </button>
        </div>

        <div id="services"  className="flex flex-col mt-10 mx-auto justify-center items-center ">
          <p className="my-10 text-center justify-center text-[30px]">خدمات</p>
          <div className="grid max-sm:grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon1.png"
                width={100}
                height={100}
              />
              <p>ایمپلنت‌های دندانی</p>
            </div>
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon2.png"
                width={100}
                height={100}
              />
              <p>زیبایی دندان</p>
            </div>
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon3.png"
                width={100}
                height={100}
              />
              <p>ریشه درمانی</p>
            </div>
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon4.png"
                width={100}
                height={100}
              />
              <p>سفید کردن دندان‌ها</p>
            </div>
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon5.png"
                width={100}
                height={100}
              />
              <p>کشیدن دندان</p>
            </div>
            <div className="flex flex-col gap-4 w-[200px] h-[150px] shadow rounded-xl items-center justify-center hover:scale-[105%] transition-all duration-300">
              <Image
                className="w-[40px]"
                src="/images/icon6.png"
                width={100}
                height={100}
              />
              <p>مراقبت‌های دندان</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 mx-auto justify-center items-center ">
          <p className="my-10 text-center justify-center text-[30px]">
            ما را در رسانه‌ها دنبال کنید
          </p>
          <div className="flex gap-2">
            <button className="bg-[#29D8DB] hover:opacity-80 transition-all duration-300 text-white p-2 rounded-xl whitespace-nowrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#ffffff"
                />
                <path
                  d="M12 16.25C9.66 16.25 7.75 14.34 7.75 12C7.75 9.66 9.66 7.75 12 7.75C14.34 7.75 16.25 9.66 16.25 12C16.25 14.34 14.34 16.25 12 16.25ZM12 9.25C10.48 9.25 9.25 10.48 9.25 12C9.25 13.52 10.48 14.75 12 14.75C13.52 14.75 14.75 13.52 14.75 12C14.75 10.48 13.52 9.25 12 9.25Z"
                  fill="#ffffff"
                />
                <path
                  d="M17 7.50003C16.87 7.50003 16.74 7.47003 16.62 7.42003C16.5 7.37003 16.39 7.30003 16.29 7.21003C16.2 7.11003 16.12 7.00003 16.07 6.88003C16.02 6.76003 16 6.63003 16 6.50003C16 6.37003 16.02 6.24003 16.07 6.12003C16.13 5.99003 16.2 5.89003 16.29 5.79003C16.34 5.75003 16.39 5.70003 16.44 5.67003C16.5 5.63003 16.56 5.60003 16.62 5.58003C16.68 5.55003 16.74 5.53003 16.81 5.52003C17.13 5.45003 17.47 5.56003 17.71 5.79003C17.8 5.89003 17.87 5.99003 17.92 6.12003C17.97 6.24003 18 6.37003 18 6.50003C18 6.63003 17.97 6.76003 17.92 6.88003C17.87 7.00003 17.8 7.11003 17.71 7.21003C17.61 7.30003 17.5 7.37003 17.38 7.42003C17.26 7.47003 17.13 7.50003 17 7.50003Z"
                  fill="#ffffff"
                />
              </svg>
            </button>

            <button className="bg-[#29D8DB] hover:opacity-80 transition-all duration-300 text-white p-2 rounded-xl whitespace-nowrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00014 22.75C1.80014 22.75 1.61011 22.67 1.47011 22.53C1.28011 22.34 1.20016 22.06 1.27016 21.8L2.53017 17.09C1.69017 15.53 1.25014 13.77 1.25014 11.99C1.25014 6.05999 6.07014 1.23999 12.0001 1.23999C17.9301 1.23999 22.7501 6.05999 22.7501 11.99C22.7501 17.92 17.9301 22.74 12.0001 22.74C10.1901 22.74 8.42017 22.29 6.84017 21.43L2.20015 22.72C2.13015 22.74 2.07014 22.75 2.00014 22.75ZM6.94014 19.88C7.07014 19.88 7.20015 19.92 7.32015 19.98C8.73015 20.81 10.3501 21.25 12.0001 21.25C17.1001 21.25 21.2501 17.1 21.2501 12C21.2501 6.9 17.1001 2.75 12.0001 2.75C6.90014 2.75 2.75014 6.9 2.75014 12C2.75014 13.63 3.18013 15.22 3.99013 16.62C4.09013 16.79 4.12015 17 4.07015 17.19L3.07015 20.93L6.75014 19.91C6.81014 19.89 6.88014 19.88 6.94014 19.88Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M14.74 17.7601C14.12 17.7601 13.48 17.62 12.81 17.33C12.18 17.06 11.55 16.7 10.94 16.25C10.34 15.81 9.75002 15.31 9.21002 14.77C8.67002 14.22 8.16998 13.6401 7.72998 13.0401C7.27998 12.4101 6.91997 11.79 6.65997 11.18C6.37997 10.52 6.23999 9.87004 6.23999 9.25004C6.23999 8.81004 6.31997 8.39004 6.46997 8.00004C6.62997 7.59004 6.88998 7.22004 7.22998 6.90004C7.86998 6.27004 8.79002 6.04006 9.52002 6.39006C9.77002 6.50006 9.98001 6.68006 10.14 6.92006L11.3 8.55003C11.42 8.71003 11.51 8.88003 11.58 9.05003C11.66 9.25003 11.71 9.45006 11.71 9.64006C11.71 9.90006 11.64 10.1601 11.5 10.3901C11.41 10.5401 11.28 10.7201 11.11 10.8901L10.98 11.03C11.04 11.11 11.11 11.21 11.22 11.33C11.43 11.57 11.66 11.83 11.91 12.08C12.16 12.32 12.41 12.56 12.66 12.77C12.78 12.87 12.88 12.95 12.96 13L13.1 12.86C13.28 12.68 13.46 12.5401 13.64 12.4501C13.97 12.2401 14.48 12.19 14.93 12.38C15.09 12.44 15.25 12.53 15.42 12.65L17.09 13.83C17.32 13.99 17.5 14.21 17.62 14.46C17.72 14.71 17.76 14.93 17.76 15.16C17.76 15.46 17.69 15.75 17.56 16.03C17.43 16.29 17.28 16.5201 17.1 16.7301C16.78 17.0801 16.41 17.3401 16.01 17.5101C15.61 17.6801 15.18 17.7601 14.74 17.7601ZM8.78998 7.74003C8.72998 7.74003 8.53003 7.74003 8.28003 7.99003C8.09003 8.17003 7.96 8.36005 7.87 8.57005C7.78 8.78005 7.73999 9.02005 7.73999 9.26005C7.73999 9.68005 7.83998 10.13 8.03998 10.61C8.24998 11.11 8.56 11.6401 8.94 12.1701C9.33 12.7001 9.77001 13.23 10.26 13.72C10.75 14.2 11.27 14.65 11.81 15.05C12.33 15.43 12.86 15.73 13.39 15.96C14.15 16.29 14.85 16.37 15.42 16.13C15.62 16.05 15.8 15.9101 15.98 15.7301C16.07 15.6301 16.14 15.53 16.2 15.4C16.23 15.33 16.25 15.25 16.25 15.18C16.25 15.16 16.25 15.13 16.22 15.07L14.55 13.91C14.48 13.86 14.41 13.82 14.35 13.8C14.31 13.82 14.25 13.85 14.14 13.96L13.76 14.34C13.47 14.63 13.01 14.71 12.64 14.58L12.46 14.5C12.23 14.38 11.97 14.2001 11.68 13.9501C11.4 13.7101 11.13 13.46 10.84 13.18C10.56 12.89 10.31 12.62 10.07 12.34C9.81001 12.03 9.63001 11.78 9.51001 11.57L9.40002 11.31C9.37002 11.21 9.35999 11.1 9.35999 11C9.35999 10.72 9.46002 10.47 9.65002 10.27L10.03 9.88005C10.14 9.77005 10.18 9.71006 10.2 9.67006C10.17 9.60006 10.13 9.54004 10.08 9.47004L8.90997 7.82005L8.78998 7.74003Z"
                    fill="#ffffff"
                  />
                </svg>
              </svg>
            </button>
          </div>
        </div>
        <div className="rounded-xl flex mx-auto my-10 justify-center items-center">
          <Image
            className="rounded-xl max-w-[90%]"
            width={1000}
            height={400}
            src={`https://api.neshan.org/v2/static?key=${
              process.env.NEXT_PUBLIC_NESHAN_MAP_API_KEY
            }&type=standard-day&zoom=17&center=${35.701715944687415},${51.422812677434564}&width=1000&height=400&marker=red`}
          />
        </div>
      </div>
    </main>
  );
}
