export default function HeaderData({ total, currentZip, status }) {
  return (
    <div>
      <div className="flex items-center font-semibold text-[22px] color-[#1a1816] whitespace-nowrap text-ellipsis pt-4">
        <h1 className="text-2xl truncate font-bold">
          {currentZip} real estate & homes for sale
        </h1>
      </div>

      {status !== "" && (
        <div className="mt-8 w-screen flex justify-center items-center">
          <h1 className="text-2xl">{status}</h1>
        </div>
      )}

      <div className="flex py-3 color-[#726a60]">
        <span className="mr-8 mb-[5px]">
          <div className="flex">
            <div>{total}</div>
            <div className="ml-1">Homes</div>
          </div>
        </span>

        <div className="relative">
          <div className="flex text-base min-h-5 p-0 absolute w-48">
            <label className="mr-1 color-[#1A1816] min-w-fit">Sort by</label>
            <select className="cursor-pointer inline-block truncate appearance-none color-[#1A1816] bg-white grow text-base font-normal leading-[1.4rem] padding-y-0 min-w-fit shadow-[rgb(114, 106, 96) 0px 0px 0px 1px inset] border-0 rounded-2">
              <option label="Relevant listings" value="">
                {" "}
                Relevant listings{" "}
              </option>
              <option label="Newest listings" value="">
                {" "}
                Newest listings{" "}
              </option>
              <option label="Lowest price" value="">
                {" "}
                Lowest price{" "}
              </option>
              <option label="Highest price" value="">
                {" "}
                Highest price{" "}
              </option>
              <option label="Year built" value="">
                {" "}
                Year built{" "}
              </option>
              <option label="Open house date" value="">
                {" "}
                Open house date{" "}
              </option>
              <option label="Recently reduced" value="">
                {" "}
                Recently reduced{" "}
              </option>
              <option label="Largest sqft" value="">
                {" "}
                Largest sqft{" "}
              </option>
              <option label="Lot size" value="">
                {" "}
                Lot size{" "}
              </option>
              <option label="Photo count" value="s">
                {" "}
                Photo count{" "}
              </option>
            </select>

            <div className="">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="inline-block; width-4 height-4 text-base "
              >
                <path d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-1.414-1.414ZM12 15l.707.707a1 1 0 0 1-1.414 0L12 15ZM5.293 9.707a1 1 0 0 1 1.414-1.414L5.293 9.707Zm13.414 0-6 6-1.414-1.414 6-6 1.414 1.414Zm-7.414 6-6-6 1.414-1.414 6 6-1.414 1.414Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
