"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import PropertiesList from "./properties/list";
import propertyListings from "./mockData";

export default function Page() {
  const [total, setTotal] = useState(0);
  const [homeSearch, setHomeSearch] = useState("01108");
  const [currentZip, setCurrentZip] = useState("01108");
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    const imageWidth =
      width > 1023
        ? Math.floor((width - 56) / 3)
        : width > 767
        ? Math.floor((width - 44) / 2)
        : width - 32;
    const imageHeight =
      width > 1023
        ? Math.floor(imageWidth * (2 / 3))
        : width > 767
        ? Math.floor(imageWidth * (2 / 3))
        : Math.floor(imageWidth * (2 / 3));

    return {
      width,
      height,
      imageWidth,
      imageHeight,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    hasWindow ? getWindowDimensions() : null
  );
  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  const getListings = async () => {
    console.log("retrieving listings");
    const url = "https://realty-in-us.p.rapidapi.com/properties/v3/list";
    //const url = "https://realtor.p.rapidapi.com/properties/v3/list";
    //const url = "https://realtor-com4.p.rapidapi.com/properties/list";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
        //"X-RapidAPI-Host": "realtor.p.rapidapi.com",
        // "X-RapidAPI-Host": "realtor-com4.p.rapidapi.com",
      },
      // body: JSON.stringify({
      //   query: {
      //     status: ["for_sale", "ready_to_build"],
      //     state_code: homeSearch,
      //   },
      //   limit: 42,
      //   offset: 0,
      //   sort: {
      //     direction: "desc",
      //     field: "list_date",
      //   },
      // }),
      body: JSON.stringify({
        limit: 3,
        offset: 0,
        postal_code: homeSearch,
        status: ["for_sale", "ready_to_build"],
        sort: {
          direction: "desc",
          field: "list_date",
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        setStatus(
          "This app has reached the maximum quota for requests from Realtor API"
        );
      }
      const result = await response.json();
      setTotal(result.data.home_search.count);
      //setTotal(result["data"]["home_search"]["count"]);
      const propertyListings = result.data.home_search.results;
      setListings(propertyListings);
      setCurrentZip(homeSearch);
      //setListings(result["data"]["home_search"]["properties"]);
    } catch (error) {
      console.error(error);
    }
    // console.log(listings);
  };

  const sortListings = (sortByProp) => {
    const sortedListings = listings.sort((a, b) => a - b);
  };

  return (
    <div className="relative">
      {/* <button onClick={() => router.push("../test")}>click</button> */}
      <Header
        homeSearch={homeSearch}
        setHomeSearch={setHomeSearch}
        getListings={getListings}
      />

      <div className="flex items-center font-semibold text-[22px] color-[#1a1816] whitespace-nowrap text-ellipsis pt-4 px-4">
        <h1 className="text-2xl truncate font-bold">
          {currentZip} real estate & homes for sale
        </h1>
      </div>

      {status !== "" && (
        <div className="mt-8 w-screen flex justify-center items-center">
          <h1 className="text-2xl">{status}</h1>
        </div>
      )}

      {/* <div className="flex py-3 px-4 color-[#726a60]">
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
      </div> */}

      <PropertiesList
        windowDimensions={windowDimensions}
        getListings={getListings}
        listings={listings}
        setListings={setListings}
      />
    </div>
  );
}
