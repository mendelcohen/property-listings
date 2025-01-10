import { useState, useEffect } from "react";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Header({
  getListings,
  listLimit,
  offset,
  homeSearch,
  setHomeSearch,
}) {
  function searchHomes(e) {
    setHomeSearch(
      homeSearch.length < 5 ? e.target.value : e.target.value.slice(0, 5)
    );
  }

  return (
    <header className="sticky top-0 h-20 p-4 shadow bg-white z-[11]">
      <div className="relative max-w-[198px]">
        <div className="relative flex items-center">
          <input
            className="h-12 w-[198px] pl-5 pr-14 border-black border-[1px] rounded-[36px]"
            placeholder="Enter a zipcode"
            // placeholder="Address, City, ZIP or Neighborhood"
            onChange={(e) => searchHomes(e)}
            value={homeSearch}
          />
          {homeSearch?.length > 0 && (
            <button
              className="absolute right-12 w-[42px] h-10 px-[9px]"
              onClick={() => setHomeSearch("")}
            >
              <Cross2Icon className="w-6 h-6 opacity-[0.6] hover:opacity-[1]" />
            </button>
          )}
        </div>
        <button
          disabled={homeSearch.length < 5}
          className={`flex h-10 w-10 bg-black ${
            homeSearch.length < 5 ? "opacity-[0.6]" : ""
          } border-0 rounded-full absolute right-1 bottom-1 z-1 justify-center items-center`}
          onClick={() => {
            getListings({ limit: listLimit, offset: offset });
          }}
        >
          <MagnifyingGlassIcon className="text-white h-7 w-7" />
        </button>
      </div>
    </header>
  );
}
