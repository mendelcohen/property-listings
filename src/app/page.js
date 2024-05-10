"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import HeaderData from "./headerData";
import PropertiesList from "./properties/list";
import Pagination from "./pagination";
import propertyListings from "./mockData";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(23);
  const [listLimit, setListLimit] = useState(3);
  const [offset, setOffset] = useState(0);
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

  useEffect(() => {
    getListings({ limit: listLimit, offset: offset });
  }, []);

  const getListings = async ({ limit, offset }) => {
    setLoading(true);
    console.log("retrieving listings");
    //const url = "https://realty-in-us.p.rapidapi.com/properties/v3/list";
    const url = "https://realtor.p.rapidapi.com/properties/v3/list";
    //const url = "https://realtor-com4.p.rapidapi.com/properties/list";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        //"X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
        "X-RapidAPI-Host": "realtor.p.rapidapi.com",
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
        limit: limit,
        offset: offset,
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
      setTotal(result.data.home_search.total);
      //setTotal(result["data"]["home_search"]["count"]);
      const propertyListings = result.data.home_search.results;
      setListings(propertyListings);
      setCurrentZip(homeSearch);
      //setListings(result["data"]["home_search"]["properties"]);
      // getSecondPhotos(propertyListings);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    // console.log(listings);
  };

  // async function getSecondPhotos(propertyListings) {
  //   const propertyListingsNew = await getPhotos(propertyListings);
  //   setListings(propertyListingsNew);
  //   setLoading(false);
  // }

  // const getPhotos = async (propertyListings) => {
  //   let propertyListingsNew = [];
  //   for (let i = 0; i < propertyListings.length; i++) {
  //     const propertysPhotos = await getPropertysPhotos(
  //       propertyListings[i].property_id
  //     );
  //     const secondPhoto =
  //       propertysPhotos.data.home_search?.results[0]?.photos[1]?.href;
  //     propertyListings[i].second_photo = secondPhoto;
  //     propertyListingsNew.push(propertyListings[i]);
  //   }
  //   return propertyListingsNew;
  // };

  // const getPropertysPhotos = async (propertyId) => {
  //   //const url = `https://realty-in-us.p.rapidapi.com/properties/v3/get-photos?property_id=${propertyId}`;
  //   const url = `https://realtor.p.rapidapi.com/properties/v3/get-photos?property_id=${propertyId}`;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
  //       //"X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
  //       "X-RapidAPI-Host": "realtor.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const sortListings = (sortByProp) => {
    const sortedListings = listings.sort((a, b) => a - b);
  };

  return (
    <div className="relative">
      {/* <button onClick={() => router.push("../test")}>click</button> */}
      <Header
        homeSearch={homeSearch}
        setHomeSearch={setHomeSearch}
        listLimit={listLimit}
        offset={offset}
        getListings={getListings}
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="p-4">
          <HeaderData total={total} currentZip={currentZip} status={status} />
          <PropertiesList
            windowDimensions={windowDimensions}
            getListings={getListings}
            listings={listings}
            setListings={setListings}
          />
          <Pagination
            listLimit={listLimit}
            total={total}
            offset={offset}
            setOffset={setOffset}
            getListings={getListings}
          />
        </div>
      )}
    </div>
  );
}
