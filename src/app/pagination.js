import { useState, useEffect } from "react";

export default function Pagination({
  listLimit,
  total,
  offset,
  setOffset,
  getListings,
}) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const pages = Math.ceil(total / listLimit);
  console.log(pages);

  useEffect(() => {
    const numbers = [];
    for (let i = 0; i < pages; i++) {
      numbers.push(i + 1);
    }
    setPageNumbers(numbers);
  }, [currentPageNumber]);
  console.log(pageNumbers);
  console.log(currentPageNumber);
  const changeListings = ({ limit, offset, page }) => {
    getListings({ limit, offset });
    setOffset(offset);
    setCurrentPageNumber(
      typeof page === "number"
        ? page
        : page === "add page"
        ? currentPageNumber + 1
        : currentPageNumber - 1
    );
  };

  return (
    <div className="flex place-content-center items-center h-8 text-sm">
      <button
        className="mr-1 px-4 h-10 leading-tight text-gray-500 bg-white border border-2 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => {
          changeListings({
            limit: listLimit,
            offset: offset - 3,
            page: "subtract page",
          });
        }}
      >
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      {pageNumbers.length > 0 &&
        pageNumbers.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`mx-1 w-8 h-10 leading-tight text-gray-500 bg-white border-2 border-gray-300 ${
                currentPageNumber === pageNumber ? "bg-gray-200" : ""
              } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              onClick={() => {
                changeListings({
                  limit: listLimit,
                  offset: pageNumber * listLimit - 3,
                  page: pageNumber,
                });
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      <button
        className="ml-1 px-4 h-10 leading-tight text-gray-500 bg-white border border-2 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => {
          changeListings({
            limit: listLimit,
            offset: offset + 3,
            page: "add page",
          });
        }}
      >
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
}
