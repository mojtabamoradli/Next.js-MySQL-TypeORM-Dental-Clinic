import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom500() {
  const router = useRouter();

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Mojtaba Moradli</title>
      </Head>

      <div className="flex absolute flex-col text-center justify-center mx-auto left-[50%] top-[50%] text-gray-900 translate-x-[-50%] translate-y-[-50%]">
        <h1 className=" text-[50px] max-sm:text-[40px] font-CenturyBold">Server Error!</h1>
        <div className=" items-center left-10 bottom-5 flex mx-auto mt-[10px] text-[20px] gap-[2px]  justify-center font-[500]">
          <button onClick={handleRefreshClick} className={`hover:opacity-90 transition-all duration-300  flex bg-gray-900 text-gray-100 p-2 w-[110px] rounded-lg h-[40px] text-center items-center justify-center font-SofiaSansExtraCondensed`}>
            Reload Page
          </button>
        </div>
      </div>
    </>
  );
}
