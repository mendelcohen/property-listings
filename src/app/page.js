"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDownIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
//import propertyListings from "./mockData";

export default function Page() {
  const [total, setTotal] = useState(0);
  const [listings, setListings] = useState([]);
  const [homeSearch, setHomeSearch] = useState("01108");
  const [currentZip, setCurrentZip] = useState("01108");
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

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
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
      //console.log(propertyListings);
      const propertyListingsNew = await getSecondPhotos(propertyListings);
      setListings(propertyListingsNew);
      setCurrentZip(homeSearch);
      //setListings(result["data"]["home_search"]["properties"]);
    } catch (error) {
      console.error(error);
    }
    // console.log(listings);
  };
  // console.log(dayjs("2024-04-04T05:42:58.000000Z").fromNow());
  // console.log(dayjs("2024-04-04T05:42:58.000000Z").format("YYYY-MM-DD hh:mma"));
  const timeSegements = [
    "hour",
    "hours",
    "minute",
    "minutes",
    "second",
    "seconds",
  ];

  function searchHomes(e) {
    setHomeSearch(
      homeSearch.length < 5 ? e.target.value : e.target.value.slice(0, 5)
    );
  }

  function selectProperty(property_id) {
    const propertyListingsNew = listings;
    for (let i = 0; i < propertyListingsNew.length; i++) {
      if (propertyListingsNew[i].property_id === property_id) {
        propertyListingsNew[i].selected = true;
      } else {
        propertyListingsNew[i].selected = false;
      }
    }
    setListings([...propertyListingsNew]);
  }

  const getSecondPhotos = async (propertyListings) => {
    let propertyListingsNew = [];
    for (let i = 0; i < propertyListings.length; i++) {
      const secondPhoto = await getSecondPhoto(propertyListings[i].property_id);
      propertyListings[i].second_photo = secondPhoto;
      propertyListingsNew.push(propertyListings[i]);
    }
    return propertyListingsNew;
  };

  const getSecondPhoto = async (propertyId) => {
    const url = `https://realty-in-us.p.rapidapi.com/properties/v3/get-photos?property_id=${propertyId}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const secondPhoto = result.data.home_search?.results[0]?.photos[1]?.href;
      return secondPhoto;
    } catch (error) {
      console.error(error);
    }
  };

  const sortListings = (sortByProp) => {
    const sortedListings = listings.sort((a, b) => a - b);
  };

  return (
    <div className="relative">
      {/* <button onClick={() => router.push("../test")}>click</button> */}
      <header className="sticky top-0 h-20 p-4 shadow bg-white z-[11]">
        <div className="relative max-w-[198px]">
          <div className=" ">
            <input
              className="flex h-12 w-[198px] pl-5 pr-14 border-black border-[1px] rounded-[36px] relative"
              placeholder="Enter a zipcode"
              // placeholder="Address, City, ZIP or Neighborhood"
              onChange={(e) => searchHomes(e)}
              value={homeSearch}
            />
            {homeSearch?.length > 0 && (
              <button
                className="absolute right-12 bottom-1 w-[42px] h-10 px-[9px] pb-[3px]"
                onClick={() => setHomeSearch("")}
              >
                <Cross2Icon className="w-6 h-6" />
              </button>
            )}
          </div>
          <button
            disabled={homeSearch.length < 5}
            className={`flex h-10 w-10 bg-black ${
              homeSearch.length < 5 ? "opacity-[0.6]" : ""
            } border-0 rounded-full absolute right-1 bottom-1 z-1 justify-center items-center`}
            onClick={() => {
              getListings();
            }}
          >
            <MagnifyingGlassIcon className="text-white h-7 w-7" />
          </button>
        </div>
      </header>

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3 px-4">
        {listings.length > 0 &&
          listings.map((listing) => {
            const {
              property_id,
              primary_photo,
              second_photo,
              branding,
              flags,
              open_houses,
              status,
              list_price,
              list_date,
              price_reduced_amount,
              description,
              location,
            } = listing;
            const { is_contingent, is_new_listing } = flags;
            const openHouses = open_houses
              ? open_houses.filter(
                  (openHouse) => dayjs(openHouse.start_date) > dayjs()
                )
              : "";
            const photo = primary_photo?.href;
            const image = photo
              ? `${photo?.substring(
                  0,
                  photo?.length - 4
                )}-w480_h360_x2${photo?.substring(photo?.length - 4)}`
              : "https://static.rdc.moveaws.com/images/common/photos-coming-soon.svg";
            const secondImage = second_photo
              ? `${second_photo?.substring(
                  0,
                  second_photo?.length - 4
                )}-w480_h360_x2${second_photo?.substring(
                  second_photo?.length - 4
                )}`
              : image;
            const { beds, baths, sqft, lot_sqft, type } = description;
            const { line, city, state_code, postal_code } = location.address;
            const { imageWidth, imageHeight } = windowDimensions;

            return (
              <div key={property_id}>
                <div className="leading-[18px] text-grey-600 text-xs truncate">
                  Brokered by {branding[0].name}
                </div>
                <div
                  onClick={() => selectProperty(property_id)}
                  className={`shadow-sm rounded-2xl ${
                    listing.selected ? `ring-2 ring-blue-600` : ``
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={image}
                      alt="House image"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority
                      className="rounded-t-2xl hover:opacity-0"
                      style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                      }}
                    />
                    <Image
                      src={secondImage}
                      alt="House image"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority
                      className="rounded-t-2xl absolute top-0 opacity-0 hover:opacity-100 duration-1000"
                      style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                      }}
                    />
                    <div className="flex flex-wrap gap-1 absolute top-0 left-0 ml-4 my-3">
                      {is_new_listing && (
                        <div className="py-1 px-2 h-6 text-xs text-white font-medium min-w-6 bg-blue-600 rounded-[40px]">
                          New
                          {timeSegements.some((element) =>
                            dayjs(list_date)
                              .fromNow()
                              .split(" ")
                              .includes(element)
                          )
                            ? ` - ${dayjs(list_date).fromNow()}`
                            : ""}
                        </div>
                      )}
                      {openHouses?.length > 0 && (
                        <div className="py-1 px-2 h-6 text-xs text-white font-medium min-w-6 bg-blue-600 rounded-[40px]">
                          Open house{" "}
                          {dayjs(open_houses[0].start_date).format("M/D")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3 shadow-md rounded-b-2xl">
                    <div className="text-sm mb-1">
                      {is_contingent ? (
                        <div className="flex">
                          <span className="flex w-3 h-3 mt-1 mr-1 bg-yellow-500 rounded-full"></span>
                          <div>Contingent</div>
                        </div>
                      ) : (
                        <div className="flex">
                          <span className="flex w-3 h-3 mt-1 mr-1 bg-green-700 rounded-full"></span>
                          <div className="text-sm font-normal">
                            {type === "land"
                              ? "Land "
                              : type === "condos"
                              ? "Condo "
                              : type === "multi_family"
                              ? "Multi-family "
                              : type === "farm"
                              ? "Farm "
                              : type === "mobile"
                              ? "Mobile "
                              : type === "townhome"
                              ? "Townhome "
                              : "House "}
                            for Sale
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex font-bold">
                      <div className="text-2xl">
                        $
                        {list_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="flex text-md text-green-700 items-center ml-2">
                        {price_reduced_amount && <ArrowDownIcon />}
                        <div className="">
                          {!price_reduced_amount
                            ? ""
                            : price_reduced_amount < 1000000 &&
                              price_reduced_amount % 1000 === 0
                            ? `$${price_reduced_amount / 1000}k`
                            : price_reduced_amount < 1000000
                            ? `$${
                                (price_reduced_amount / 1000)
                                  .toString()
                                  .match(/^-?\d+(?:\.\d{0,1})?/)[0]
                              }k`
                            : price_reduced_amount >= 1000000 &&
                              price_reduced_amount % 1000000 === 0
                            ? `$${price_reduced_amount / 1000000}m`
                            : price_reduced_amount >= 1000000
                            ? `$${
                                (price_reduced_amount / 1000000)
                                  .toString()
                                  .match(/^-?\d+(?:\.\d{0,1})?/)[0]
                              }m`
                            : ""}
                        </div>
                      </div>
                    </div>
                    <ul className="flex gap-3 text-base my-1">
                      {beds && (
                        <li>
                          <span className="font-bold">{beds}</span> bed
                        </li>
                      )}
                      {baths && (
                        <li>
                          <span className="font-bold">{baths}</span> bath
                        </li>
                      )}
                      {sqft && (
                        <li>
                          <span className="font-bold">
                            {sqft
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>{" "}
                          sqft
                        </li>
                      )}
                      {lot_sqft && (
                        <li>
                          <span className="font-bold">
                            {
                              (lot_sqft / 43560)
                                .toString()
                                .match(/^-?\d+(?:\.\d{0,2})?/)[0]
                            }
                          </span>{" "}
                          acre lot
                        </li>
                      )}
                    </ul>
                    <div className="flex justify-between text-sm">
                      <div>
                        <div>{line}</div>
                        <div>
                          {city}, {state_code} {postal_code}
                        </div>
                      </div>
                      <div>
                        <button className="h-10 border-[1px] border-black rounded-[40px] font-medium px-4">
                          Email Agent
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
