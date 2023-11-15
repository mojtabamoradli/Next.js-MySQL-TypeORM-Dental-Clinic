import React from "react";
import { convertEnglishNumbersToPersian } from "@/functions/convertEnglishNumbersToPersian";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  pageInstances,
  fetching,
}) => {
  return (
    <div
      className={` w-fit rounded-lg flex mt-[30px] mb-[30px] justify-center mx-auto items-center gap-[1px] p-1 `}
    >
      <button
        onClick={() => currentPage !== 1 && setCurrentPage(1)}
        disabled={currentPage == 1}
        className=" h-[35px] disabled:text-gray-200 hover:text-gray-200 text-gray-900 rounded-r-lg flex p-1 items-center justify-center"
      >
        <svg
          id="first"
          className="rotate-180"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.74005 11.9999C8.74005 11.8099 8.81015 11.6199 8.96015 11.4699L11.9601 8.46994C12.2501 8.17994 12.73 8.17994 13.02 8.46994C13.31 8.75994 13.31 9.23994 13.02 9.52994L10.55 11.9999L13.02 14.4699C13.31 14.7599 13.31 15.2399 13.02 15.5299C12.73 15.8199 12.2501 15.8199 11.9601 15.5299L8.96015 12.5299C8.81015 12.3799 8.74005 12.1899 8.74005 11.9999Z"
            fill="#000"
          />
          <path
            d="M8.74 12C8.74 11.59 9.08 11.25 9.49 11.25L17.49 11.25C17.9 11.25 18.24 11.59 18.24 12C18.24 12.41 17.9 12.75 17.49 12.75L9.49 12.75C9.07 12.75 8.74 12.41 8.74 12Z"
            fill="#000"
          />
          <path
            d="M5.77008 11.9999C5.77008 9.88994 6.11008 7.76995 6.78008 5.75995C6.91008 5.36995 7.34008 5.15995 7.73008 5.28995C8.12008 5.41995 8.34008 5.83994 8.20008 6.23994C6.96008 9.95994 6.96008 14.0499 8.20008 17.7699C8.33008 18.1599 8.12008 18.5899 7.73008 18.7199C7.34008 18.8499 6.91008 18.6399 6.78008 18.2499C6.10008 16.2299 5.77008 14.1099 5.77008 11.9999Z"
            fill="#000"
          />
        </svg>
      </button>

      <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className=" h-[35px] disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center"
      >
        <svg
          id="previous"
          className="rotate-180"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00005 11.7475C7.00005 11.5575 7.07015 11.3675 7.22015 11.2175L10.2201 8.2175C10.5101 7.9275 10.99 7.9275 11.28 8.2175C11.57 8.5075 11.57 8.9875 11.28 9.2775L8.81 11.7475L11.28 14.2175C11.57 14.5075 11.57 14.9875 11.28 15.2775C10.99 15.5675 10.5101 15.5675 10.2201 15.2775L7.22015 12.2775C7.07015 12.1275 7.00005 11.9375 7.00005 11.7475Z"
            fill="#000"
          />
          <path
            d="M7 11.7476C7 11.3376 7.34 10.9976 7.75 10.9976H15.75C16.16 10.9976 16.5 11.3376 16.5 11.7476C16.5 12.1576 16.16 12.4976 15.75 12.4976H7.75C7.33 12.4976 7 12.1576 7 11.7476Z"
            fill="#000"
          />
        </svg>
      </button>

      <div className="flex gap-[1px] items-center">
        {currentPage > pageInstances && (
          <div className=" disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center h-[35px] w-[30px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C11.44 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.56 13 12 13Z"
                fill="#000"
              />
              <path
                d="M16 13C15.44 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.56 13 16 13Z"
                fill="#000"
              />
              <path
                d="M8 13C7.44 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.56 13 8 13Z"
                fill="#000"
              />
            </svg>
          </div>
        )}
        {Array?.from(
          { length: Math.min(totalPages, pageInstances) },
          (_, index) => {
            const pageNumber =
              index + 1 + Math.max(0, currentPage - pageInstances);
            return (
              <button
                disabled={pageNumber === currentPage}
                className=" h-[35px] disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center w-[30px]"
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {fetching && currentPage == index + 1
                  ? "..."
                  : convertEnglishNumbersToPersian(pageNumber)}
              </button>
            );
          }
        )}

        {totalPages > pageInstances && totalPages - currentPage > 1 && (
          <div className=" disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center h-[35px] w-[30px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C11.44 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.56 13 12 13Z"
                fill="#000"
              />
              <path
                d="M16 13C15.44 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.56 13 16 13Z"
                fill="#000"
              />
              <path
                d="M8 13C7.44 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.56 13 8 13Z"
                fill="#000"
              />
            </svg>
          </div>
        )}

        {totalPages > pageInstances && totalPages !== currentPage && (
          <button
            disabled={totalPages === currentPage}
            className=" h-[35px] disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center w-[30px]"
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {convertEnglishNumbersToPersian(totalPages)}
          </button>
        )}
      </div>

      <button
        onClick={() =>
          totalPages > currentPage && setCurrentPage(currentPage + 1)
        }
        disabled={totalPages <= currentPage}
        className=" h-[35px] disabled:text-gray-200 hover:text-gray-200 text-gray-900 flex p-1 items-center justify-center"
      >
        <svg
          id="next"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00005 11.7475C7.00005 11.5575 7.07015 11.3675 7.22015 11.2175L10.2201 8.2175C10.5101 7.9275 10.99 7.9275 11.28 8.2175C11.57 8.5075 11.57 8.9875 11.28 9.2775L8.81 11.7475L11.28 14.2175C11.57 14.5075 11.57 14.9875 11.28 15.2775C10.99 15.5675 10.5101 15.5675 10.2201 15.2775L7.22015 12.2775C7.07015 12.1275 7.00005 11.9375 7.00005 11.7475Z"
            fill="#000"
          />
          <path
            d="M7 11.7476C7 11.3376 7.34 10.9976 7.75 10.9976H15.75C16.16 10.9976 16.5 11.3376 16.5 11.7476C16.5 12.1576 16.16 12.4976 15.75 12.4976H7.75C7.33 12.4976 7 12.1576 7 11.7476Z"
            fill="#000"
          />
        </svg>
      </button>

      <button
        onClick={() => currentPage !== totalPages && setCurrentPage(totalPages)}
        disabled={currentPage == totalPages}
        className=" disabled:text-gray-200 h-[35px] hover:text-gray-200 text-gray-900 rounded-l-lg flex p-1 items-center justify-center"
      >
        <svg
          id="last"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.74005 11.9999C8.74005 11.8099 8.81015 11.6199 8.96015 11.4699L11.9601 8.46994C12.2501 8.17994 12.73 8.17994 13.02 8.46994C13.31 8.75994 13.31 9.23994 13.02 9.52994L10.55 11.9999L13.02 14.4699C13.31 14.7599 13.31 15.2399 13.02 15.5299C12.73 15.8199 12.2501 15.8199 11.9601 15.5299L8.96015 12.5299C8.81015 12.3799 8.74005 12.1899 8.74005 11.9999Z"
            fill="#000"
          />
          <path
            d="M8.74 12C8.74 11.59 9.08 11.25 9.49 11.25L17.49 11.25C17.9 11.25 18.24 11.59 18.24 12C18.24 12.41 17.9 12.75 17.49 12.75L9.49 12.75C9.07 12.75 8.74 12.41 8.74 12Z"
            fill="#000"
          />
          <path
            d="M5.77008 11.9999C5.77008 9.88994 6.11008 7.76995 6.78008 5.75995C6.91008 5.36995 7.34008 5.15995 7.73008 5.28995C8.12008 5.41995 8.34008 5.83994 8.20008 6.23994C6.96008 9.95994 6.96008 14.0499 8.20008 17.7699C8.33008 18.1599 8.12008 18.5899 7.73008 18.7199C7.34008 18.8499 6.91008 18.6399 6.78008 18.2499C6.10008 16.2299 5.77008 14.1099 5.77008 11.9999Z"
            fill="#000"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
