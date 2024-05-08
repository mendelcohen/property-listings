import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function PropertiesList({
  windowDimensions,
  listings,
  setListings,
  loading,
  setLoading,
}) {
  useEffect(() => {
    if (loading && listings.length > 0) {
      getSecondPhotos();
    }
  }, [listings]);

  async function getSecondPhotos() {
    const propertyListingsNew = await getPhotos(listings);
    setListings(propertyListingsNew);
    setLoading(false);
  }

  const timeSegements = [
    "hour",
    "hours",
    "minute",
    "minutes",
    "second",
    "seconds",
  ];

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

  const getPhotos = async (propertyListings) => {
    let propertyListingsNew = [];
    for (let i = 0; i < propertyListings.length; i++) {
      const propertysPhotos = await getPropertysPhotos(
        propertyListings[i].property_id
      );
      const secondPhoto =
        propertysPhotos.data.home_search?.results[0]?.photos[1]?.href;
      propertyListings[i].second_photo = secondPhoto;
      propertyListingsNew.push(propertyListings[i]);
    }
    return propertyListingsNew;
  };

  const getPropertysPhotos = async (propertyId) => {
    //const url = `https://realty-in-us.p.rapidapi.com/properties/v3/get-photos?property_id=${propertyId}`;
    const url = `https://realtor.p.rapidapi.com/properties/v3/get-photos?property_id=${propertyId}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        //"X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
        "X-RapidAPI-Host": "realtor.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3">
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
  );
}
