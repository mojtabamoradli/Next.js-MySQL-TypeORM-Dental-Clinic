import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>صفحه‌ی مورد نظر یافت نشد</title>
      </Head>

      <div className="flex absolute flex-col text-center justify-center mx-auto left-[50%] top-[50%] text-gray-900 translate-x-[-50%] translate-y-[-50%]">
        <h1 className=" text-[50px] ">صفحه‌ی مورد نظر یافت نشد.</h1>
        <div className=" items-center left-10 bottom-5 flex mx-auto mt-[10px] text-[20px] gap-[2px]  justify-center font-[500]">
          <Link href="/" className={`hover:opacity-90 transition-all duration-300  flex bg-[#29D8DB] text-gray-100 p-2 w-auto rounded-lg h-[40px] text-center items-center justify-center`}>
            بازگشت به صفحه‌ی اصلی
          </Link>
        </div>
      </div>
    </>
  );
}
